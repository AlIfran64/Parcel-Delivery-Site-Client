import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ActiveRider = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch approved riders
  const { data: riders = [], isLoading, refetch } = useQuery({
    queryKey: ['approvedRiders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/approved');
      return res.data;
    },
  });

  // Deactivate rider mutation
  const mutation = useMutation({
    mutationFn: async ({ id }) => {
      return await axiosSecure.patch(`/riders/${id}`, { status: 'inactive' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['approvedRiders']);
      Swal.fire('Deactivated', 'Rider deactivated successfully', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to deactivate rider', 'error');
    },
  });

  const handleDeactivate = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to deactivate this rider?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, deactivate',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        refetch();
        mutation.mutate({ id });
      }
    });
  };

  // Filtered riders by name
  const filteredRiders = riders.filter((rider) =>
    rider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : filteredRiders.length === 0 ? (
        <p>No active riders found.</p>
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
                <th className="px-4 py-2 border">Contact</th>
                <th className="px-4 py-2 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRiders.map((rider) => (
                <tr key={rider._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{rider.name}</td>
                  <td className="px-4 py-2 border">{rider.age}</td>
                  <td className="px-4 py-2 border">{rider.email}</td>
                  <td className="px-4 py-2 border">{rider.region}</td>
                  <td className="px-4 py-2 border">{rider.warehouse}</td>
                  <td className="px-4 py-2 border">{rider.contact}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleDeactivate(rider._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Deactivate
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

export default ActiveRider;
