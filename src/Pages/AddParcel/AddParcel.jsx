import React from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import serviceCenters from '../../../src/data/warehouses.json';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const AddParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Debugging user info
  // useEffect(() => {
  //   console.log('Current user:', user);
  // }, [user]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onTouched', // Validate on touched to reduce aggressive validation focus
  });

  const parcelType = watch('parcelType');
  const selectedRegion = watch('senderRegion');
  const receiverRegion = watch('receiverRegion');

  const getDistrictsByRegion = (region) => {
    return serviceCenters
      .filter((item) => item.region === region)
      .map((item) => item.district);
  };

  const uniqueRegions = [...new Set(serviceCenters.map((item) => item.region))];

  const onSubmit = (data) => {
    console.log('Form data before adding user:', data);

    const isWithinCity = data.senderDistrict === data.receiverDistrict;
    const weight = parseFloat(data.parcelWeight || 0);

    const baseCost =
      data.parcelType === 'Document'
        ? isWithinCity
          ? 60
          : 80
        : weight <= 3
          ? isWithinCity
            ? 110
            : 150
          : isWithinCity
            ? 110
            : 150;

    const extraWeight =
      data.parcelType === 'Not-Document' && weight > 3 ? weight - 3 : 0;
    const extraCharge = extraWeight * 40;
    const distanceFee =
      !isWithinCity && data.parcelType === 'Not-Document' && extraWeight > 0
        ? 40
        : 0;

    const totalCost = baseCost + extraCharge + distanceFee;

    const now = new Date();
    const trackingId = `TRK${Date.now()
      .toString()
      .slice(-6)}${Math.floor(Math.random() * 900 + 100)}`;

    const submissionData = {
      ...data,
      cost: totalCost,
      createdBy: user?.email || 'anonymous',
      created_At: now,
      creation_date: now.toISOString(),
      creation_time: now.toLocaleTimeString(),
      creation_date_string: now.toLocaleDateString(),
      trackingId,
      status: 'Pending',
    };

    console.log('Final submission data:', submissionData);

    // Send data to server
    axiosSecure.post('parcels', submissionData)
      .then((res) => {
        console.log('Server response:', res.data);
        if (res.data.insertedId) {
          toast.success('Parcel added successfully!');
          navigate('/dashboard/myParcels');
          reset();
        }
      })

    // Show toast modal immediately, no setTimeout
    toast.custom(
      (t) => (
        <div
          className={`bg-white rounded-xl shadow-2xl border border-[#CAEB66] w-[90%] max-w-md p-6 text-gray-800
            transition-all duration-300 transform ${t.visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }
          `}
        >
          <h2 className="text-xl font-bold text-center mb-4">Price Breakdown</h2>
          <div className="text-sm space-y-2 mb-4">
            <p>
              <strong>Parcel Type:</strong> {data.parcelType}
            </p>
            {data.parcelType === 'Not-Document' && (
              <>
                <p>
                  <strong>Weight:</strong> {weight} KG
                </p>
                <p>
                  <strong>Extra Weight:</strong>{' '}
                  {extraWeight > 0 ? `${extraWeight.toFixed(2)} KG` : 'None'}
                </p>
                <p>
                  <strong>Extra Charge:</strong> ৳{extraCharge}
                </p>
                {distanceFee > 0 && (
                  <p>
                    <strong>Long Distance Fee:</strong> ৳40
                  </p>
                )}
              </>
            )}
            <p>
              <strong>Route:</strong> {data.senderDistrict} → {data.receiverDistrict}
            </p>
            <p>
              <strong>Region:</strong> {isWithinCity ? 'Within City' : 'Different City'}
            </p>
            <p className="text-lg font-semibold text-[#598B00] pt-2 border-t">
              Total Cost: ৳{totalCost}
            </p>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => {
                console.log('Confirmed booking data:', submissionData);
                toast.success('Booking Confirmed & Saved!');
                reset();
                toast.dismiss(t.id);
              }}
              className="bg-[#CAEB66] hover:bg-lime-500 text-gray-900 font-bold py-2 px-4 rounded"
            >
              Confirm & Proceed
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded"
            >
              Continue Editing
            </button>
          </div>
        </div>
      ),
      {
        position: 'top-center',
        duration: Infinity,
      }
    );
  };

  return (
    <div className="w-11/12 mx-auto my-10 p-10 bg-white rounded-2xl shadow-md">
      <Toaster />
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Add Parcel</h1>
      <div className="h-px bg-gray-300 my-8"></div>
      <p className="text-xl font-semibold mb-6 text-gray-600">Enter your parcel details</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      // disable native validation to prevent jumping focus
      >
        {/* Parcel Type */}
        <div className="flex items-center gap-6 mb-6">
          <label className="flex items-center gap-2 text-gray-700 font-medium">
            <input
              type="radio"
              value="Document"
              {...register('parcelType', { required: true })}
              className="accent-[#CAEB66] w-5 h-5"
            />
            Document
          </label>
          <label className="flex items-center gap-2 text-gray-700 font-medium">
            <input
              type="radio"
              value="Not-Document"
              {...register('parcelType', { required: true })}
              className="accent-[#CAEB66] w-5 h-5"
            />
            Non-Document
          </label>
          {errors.parcelType && (
            <p className="text-red-500 text-sm">Parcel type is required</p>
          )}
        </div>

        {/* Parcel Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Parcel Name</label>
            <input
              type="text"
              {...register('parcelName', { required: true })}
              placeholder="Parcel Name"
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.parcelName && (
              <p className="text-red-500 text-sm mt-1">Parcel name is required</p>
            )}
          </div>
          {parcelType === 'Not-Document' && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Parcel Weight (KG)
              </label>
              <input
                type="number"
                step="0.1"
                {...register('parcelWeight')}
                placeholder="Parcel Weight (KG)"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="h-px bg-gray-200 my-8"></div>

        {/* Sender & Receiver */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Sender */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Sender Details</h2>
            <input
              {...register('senderName', { required: true })}
              type="text"
              placeholder="Sender Name"
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            />
            <select
              {...register('senderWarehouse', { required: true })}
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            >
              <option value="">Select Warehouse</option>
              <option value="Warehouse A">Warehouse A</option>
              <option value="Warehouse B">Warehouse B</option>
            </select>
            <input
              {...register('senderAddress', { required: true })}
              type="text"
              placeholder="Sender Address"
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            />
            <input
              {...register('senderContact', {
                required: true,
                pattern: /^[0-9+]+$/,
              })}
              type="text"
              placeholder="Sender Contact No"
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            />
            {errors.senderContact && (
              <p className="text-red-500 text-sm mb-4">
                Enter valid phone number (digits and + only)
              </p>
            )}
            <select
              {...register('senderRegion', { required: true })}
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            >
              <option value="">Select Region</option>
              {uniqueRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            {selectedRegion && (
              <select
                {...register('senderDistrict', { required: true })}
                className="w-full mb-4 px-4 py-2 border rounded-lg"
              >
                <option value="">Select Service Center</option>
                {getDistrictsByRegion(selectedRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            )}
            <textarea
              {...register('pickupInstruction')}
              placeholder="Pickup Instruction"
              className="w-full px-4 py-2 border rounded-lg"
              rows="3"
            ></textarea>
          </div>

          {/* Receiver */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Receiver Details</h2>
            <input
              {...register('receiverName', { required: true })}
              type="text"
              placeholder="Receiver Name"
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            />
            <select
              {...register('receiverWarehouse', { required: true })}
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            >
              <option value="">Select Warehouse</option>
              <option value="Warehouse A">Warehouse A</option>
              <option value="Warehouse B">Warehouse B</option>
            </select>
            <input
              {...register('receiverAddress', { required: true })}
              type="text"
              placeholder="Receiver Address"
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            />
            <input
              {...register('receiverContact', {
                required: true,
                pattern: /^[0-9+]+$/,
              })}
              type="text"
              placeholder="Receiver Contact No"
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            />
            {errors.receiverContact && (
              <p className="text-red-500 text-sm mb-4">
                Enter valid phone number (digits and + only)
              </p>
            )}
            <select
              {...register('receiverRegion', { required: true })}
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            >
              <option value="">Select Region</option>
              {uniqueRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            {receiverRegion && (
              <select
                {...register('receiverDistrict', { required: true })}
                className="w-full mb-4 px-4 py-2 border rounded-lg"
              >
                <option value="">Select Service Center</option>
                {getDistrictsByRegion(receiverRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            )}
            <textarea
              {...register('deliveryInstruction')}
              placeholder="Delivery Instruction"
              className="w-full px-4 py-2 border rounded-lg"
              rows="3"
            ></textarea>
          </div>
        </div>

        <p className="font-semibold mt-10">* PickUp Time 4pm–7pm Approx.</p>

        <div className="mt-10">
          <button
            type="submit"
            className="bg-[#CAEB66] hover:bg-lime-400 text-gray-800 font-bold py-3 px-10 rounded-lg shadow transition duration-300"
          >
            Proceed to Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddParcel;
