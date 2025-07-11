import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import agent from '../../../src/assets/images/agent-pending.png';
import divisions from '../../../src/data/division.json';
import warehouses from '../../../src/data/warehouses.json';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const BeArider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [region, setRegion] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const selectedRegion = watch('region');

  useEffect(() => {
    if (user) {
      setValue('name', user.displayName || '');
      setValue('email', user.email || '');
    }
  }, [user, setValue]);

  const filteredWarehouses = warehouses.filter(
    (wh) =>
      wh.region.toLowerCase().trim() ===
      (selectedRegion || '').toLowerCase().trim()
  );

  const onSubmit = (data) => {
    const riderData = {
      ...data,
      name: user?.displayName || "",
      email: user?.email || "",
      status: 'pending',
      created_At: new Date().toISOString(),
      role: 'user'
    };

    axiosSecure.post('/riders', riderData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Rider application submitted successfully!");
        }
      })
      .catch((error) => {
        toast.error("Failed to submit rider application. Please try again.", error);
      });

  };

  return (
    <div className="w-11/12 mx-auto my-10 p-10 bg-white rounded-lg">
      <div>
        <h1 className="text-[#03373D] text-4xl font-extrabold">Be A Rider</h1>
        <p className="mt-3">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal <br /> packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      <div className="mt-10 flex flex-col md:flex-row gap-8">
        {/* Left: Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2 space-y-6">
          <h2 className="text-xl font-bold mb-2 text-[#03373D]">Tell us about yourself</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              readOnly
              {...register('name')}
              className="border p-2 rounded bg-gray-100 text-gray-600 cursor-not-allowed"
            />

            <input
              type="email"
              readOnly
              {...register('email')}
              className="border p-2 rounded bg-gray-100 text-gray-600 cursor-not-allowed"
            />

            <input
              type="number"
              placeholder="Age"
              {...register('age', { required: 'Age is required' })}
              className="border p-2 rounded"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}

            <select
              {...register('region', { required: 'Region is required' })}
              onChange={(e) => {
                setRegion(e.target.value);
                setValue('region', e.target.value);
                setValue('warehouse', '');
              }}
              className="border p-2 rounded"
            >
              <option value="">Select Region</option>
              {divisions.map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
            {errors.region && <p className="text-red-500 text-sm">{errors.region.message}</p>}

            <input
              type="text"
              placeholder="NID Number"
              {...register('nid', { required: 'NID is required' })}
              className="border p-2 rounded"
            />
            {errors.nid && <p className="text-red-500 text-sm">{errors.nid.message}</p>}

            <input
              type="text"
              placeholder="Contact Number"
              {...register('contact', { required: 'Contact number is required' })}
              className="border p-2 rounded"
            />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
          </div>

          <div>
            <select
              {...register('warehouse', {
                required: 'Please select a warehouse',
              })}
              disabled={!selectedRegion}
              className="border p-2 rounded w-full mt-4"
            >
              <option value="">
                {selectedRegion ? 'Select Warehouse' : 'Select Region First'}
              </option>
              {filteredWarehouses.map((wh, index) => (
                <option key={index} value={wh.city}>
                  {wh.city} ({wh.covered_area.join(', ')})
                </option>
              ))}
            </select>
            {errors.warehouse && <p className="text-red-500 text-sm">{errors.warehouse.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-[#CAEB66] hover:bg-lime-400 text-[#03373D] font-bold py-2 px-4 rounded mt-4 w-full"
          >
            Submit
          </button>
        </form>

        {/* Right: Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img src={agent} alt="Agent illustration" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default BeArider;
