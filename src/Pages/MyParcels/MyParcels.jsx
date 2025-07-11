import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link } from 'react-router';

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  paid: 'bg-green-100 text-green-800',
};

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: parcels = [], isLoading, error, refetch } = useQuery({
    queryKey: ['my-parcels', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (parcelId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this parcel?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/parcels/${parcelId}`);
        if (res.data.deletedCount) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Parcel has been deleted.',
            timer: 2000,
            showConfirmButton: false,
          });
          refetch();
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete parcel. Please try again.',
        });
      }
    }
  };

  if (isLoading) return <p className="p-6 text-center">Loading parcels...</p>;
  if (error) return <p className="p-6 text-center text-red-500">Failed to load parcels.</p>;

  return (
    <div className="p-6 max-w-full overflow-x-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Parcels</h1>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3 border-b border-gray-300">Tracking ID</th>
            <th className="text-left p-3 border-b border-gray-300">Created At</th>
            <th className="text-left p-3 border-b border-gray-300">Parcel Type</th>
            <th className="text-left p-3 border-b border-gray-300">Parcel Name</th>
            <th className="text-left p-3 border-b border-gray-300">Sender</th>
            <th className="text-left p-3 border-b border-gray-300">Receiver</th>
            <th className="text-left p-3 border-b border-gray-300">Weight (KG)</th>
            <th className="text-left p-3 border-b border-gray-300">Cost (৳)</th>
            <th className="text-left p-3 border-b border-gray-300">Status</th>
            <th className="text-center p-3 border-b border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.length === 0 && (
            <tr>
              <td colSpan={10} className="text-center p-6 text-gray-500">
                No parcels found.
              </td>
            </tr>
          )}
          {parcels.map((parcel) => {
            const statusKey = parcel.status?.toLowerCase(); // safe for style match
            const isPaid = statusKey === 'paid';

            return (
              <tr
                key={parcel._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="p-3 border-b border-gray-200 font-mono">{parcel.trackingId}</td>
                <td className="p-3 border-b border-gray-200 whitespace-nowrap">
                  {parcel.creation_date_string}, {parcel.creation_time}
                </td>
                <td className="p-3 border-b border-gray-200 capitalize">
                  {parcel.parcelType === 'Document' ? 'Document' : 'Not-Document'}
                </td>
                <td className="p-3 border-b border-gray-200">{parcel.parcelName}</td>
                <td className="p-3 border-b border-gray-200">{parcel.senderName}</td>
                <td className="p-3 border-b border-gray-200">{parcel.receiverName}</td>
                <td className="p-3 border-b border-gray-200 text-center">
                  {parcel.parcelWeight || '-'}
                </td>
                <td className="p-3 border-b border-gray-200 text-right font-semibold">
                  ৳{parcel.cost}
                </td>
                <td className="p-3 border-b border-gray-200">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[statusKey] || 'bg-gray-200 text-gray-700'
                      }`}
                  >
                    {parcel.status}
                  </span>
                </td>
                <td className="p-3 border-b border-gray-200 text-center space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => Swal.fire(`Viewing details for ${parcel.trackingId}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-1 text-sm font-semibold"
                  >
                    View
                  </button>

                  {isPaid ? (
                    <button
                      disabled
                      className="bg-gray-400 text-white rounded px-3 py-1 text-sm font-semibold cursor-not-allowed"
                    >
                      Paid
                    </button>
                  ) : (
                    <Link to={`/dashboard/payment/${parcel._id}`}>
                      <button
                        className="bg-lime-500 hover:bg-lime-600 text-white rounded px-3 py-1 text-sm font-semibold"
                      >
                        Pay
                      </button>
                    </Link>
                  )}

                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1 text-sm font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
