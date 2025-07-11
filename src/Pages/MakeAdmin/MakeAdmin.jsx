import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchEmail, setSearchEmail] = useState('');
  const [triggerSearch, setTriggerSearch] = useState('');

  // Search Query
  const { data: users = [], isFetching } = useQuery({
    queryKey: ['searchUser', triggerSearch],
    enabled: !!triggerSearch,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${triggerSearch}`);
      return res.data;
    },
  });

  // Mutation to update user role (make or remove admin)
  const mutation = useMutation({
    mutationFn: async ({ userId, newRole }) => {
      return await axiosSecure.patch(`/users/${userId}/role`, { role: newRole });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['searchUser']);
      Swal.fire('Success', 'User role updated successfully', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update user role', 'error');
    },
  });

  // Trigger search on button click
  const handleSearch = () => {
    if (searchEmail.trim()) {
      setTriggerSearch(searchEmail.trim());
    }
  };

  // Toggle user role between admin and user
  const handleToggleRole = (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    Swal.fire({
      title: `Are you sure you want to ${newRole === 'admin' ? 'make admin' : 'remove admin'}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ userId, newRole });
      }
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Make Admin</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {isFetching ? (
        <p>Searching...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="min-w-full border shadow text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Joined</th>
              <th className="px-4 py-2 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border capitalize">{user.role}</td>
                <td className="px-4 py-2 border">
                  {new Date(user.createdAt || user.created_At).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleToggleRole(user._id, user.role)}
                    className={`${user.role === 'admin'
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-green-500 hover:bg-green-600'
                      } text-white px-3 py-1 rounded`}
                  >
                    {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MakeAdmin;
