import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch parcels
  const { data: parcels = [], isLoading: parcelsLoading } = useQuery({
    queryKey: ['parcels'],
    queryFn: async () => {
      const res = await axiosSecure.get('/parcels');
      return res.data;
    },
  });

  // Fetch approved riders
  const { data: riders = [], isLoading: ridersLoading } = useQuery({
    queryKey: ['approvedRiders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/approved');
      return res.data;
    },
  });

  // Mutation to assign rider
  const assignMutation = useMutation({
    mutationFn: async ({ parcelId, riderId }) => {
      const res = await axiosSecure.patch(`/parcels/${parcelId}/assign`, {
        riderId,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Rider assigned successfully!');
      queryClient.invalidateQueries(['parcels']);
      closeModal();
    },
    onError: () => {
      toast.error('Failed to assign rider');
    },
  });

  const handleAssignRider = (parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedParcel(null);
    setIsModalOpen(false);
  };

  const matchedRiders = selectedParcel
    ? riders.filter(
      (rider) =>
        rider.region?.toLowerCase() === selectedParcel.receiverRegion?.toLowerCase()
    )
    : [];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Assign Rider</h2>

      {parcelsLoading ? (
        <p>Loading parcels...</p>
      ) : parcels.length === 0 ? (
        <p>No parcels available.</p>
      ) : (
        <table className="min-w-full border text-sm shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Tracking ID</th>
              <th className="px-4 py-2 border">Sender</th>
              <th className="px-4 py-2 border">Receiver</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{parcel.trackingId || 'N/A'}</td>
                <td className="px-4 py-2 border">{parcel.senderName || 'N/A'}</td>
                <td className="px-4 py-2 border">{parcel.receiverName || 'N/A'}</td>
                <td className="px-4 py-2 border capitalize">{parcel.status || 'N/A'}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleAssignRider(parcel)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {isModalOpen && selectedParcel && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded shadow-md relative">
            <h3 className="text-xl font-semibold mb-4">
              Assign Rider for:{' '}
              <span className="text-blue-600">{selectedParcel.trackingId}</span>
            </h3>

            {ridersLoading ? (
              <p>Loading riders...</p>
            ) : matchedRiders.length === 0 ? (
              <p className="text-red-500">No approved riders in this region.</p>
            ) : (
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {matchedRiders.map((rider) => (
                  <li
                    key={rider._id}
                    className="flex justify-between items-center border px-4 py-2 rounded hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-semibold">{rider.name || rider.email}</p>
                      <p className="text-sm text-gray-500">Region: {rider.region}</p>
                    </div>
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      onClick={() =>
                        assignMutation.mutate({
                          parcelId: selectedParcel._id,
                          riderId: rider._id,
                        })
                      }
                    >
                      Select
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRider;
