import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const PendingRider = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all pending riders
  const { data: riders = [], isLoading, refetch } = useQuery({
    queryKey: ['pendingRiders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/pending');
      return res.data;
    },
  });

  // Approve or Reject mutation
  const mutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return await axiosSecure.patch(`/riders/${id}`, { status });
    },
    onSuccess: (_, { id, status }) => {
      // Optimistic UI update: remove rider from list
      queryClient.setQueryData(['pendingRiders'], (oldData) =>
        oldData.filter((rider) => rider._id !== id)
      );
      Swal.fire('Success', `Rider ${status}`, 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update status', 'error');
    },
  });

  const handleAction = (id, status) => {
    Swal.fire({
      title: `Are you sure you want to ${status} this rider?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}`,
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        refetch();
        mutation.mutate({ id, status });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : riders.length === 0 ? (
        <p>No pending riders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Age</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Region</th>
                <th className="px-4 py-2 border">Warehouse</th>
                <th className="px-4 py-2 border">NID</th>
                <th className="px-4 py-2 border">Contact</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider) => (
                <tr key={rider._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{rider.name}</td>
                  <td className="px-4 py-2 border">{rider.age}</td>
                  <td className="px-4 py-2 border">{rider.email}</td>
                  <td className="px-4 py-2 border">{rider.region}</td>
                  <td className="px-4 py-2 border">{rider.warehouse}</td>
                  <td className="px-4 py-2 border">{rider.nid}</td>
                  <td className="px-4 py-2 border">{rider.contact}</td>
                  <td className="px-4 py-2 border text-center capitalize">
                    {rider.status}
                  </td>
                  <td className="px-4 py-2 border text-center space-x-2">
                    <button
                      onClick={() => handleAction(rider._id, 'approved')}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(rider._id, 'rejected')}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingRider;
