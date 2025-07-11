import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: allPayments = [], isLoading, error } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments');
      return res.data;
    },
  });

  // Filter payments by current user email
  const payments = allPayments?.filter(payment => payment.email === user?.email) || [];

  if (isLoading) return <p className="p-6 text-center">Loading payment history...</p>;
  if (error) return <p className="p-6 text-center text-red-500">Failed to load payment data.</p>;

  return (
    <div className="p-6 max-w-full overflow-x-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Payment History</h1>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3 border-b border-gray-300">#</th>
            <th className="text-left p-3 border-b border-gray-300">Email</th>
            <th className="text-left p-3 border-b border-gray-300">Amount (৳)</th>
            <th className="text-left p-3 border-b border-gray-300">Method</th>
            <th className="text-left p-3 border-b border-gray-300">Transaction ID</th>
            <th className="text-left p-3 border-b border-gray-300">Date</th>
            <th className="text-left p-3 border-b border-gray-300">Time</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan="7" className="p-6 text-center text-gray-500">
                No payment records found.
              </td>
            </tr>
          ) : (
            payments.map((payment, index) => {
              const dateObj = new Date(payment.paidAt);
              const localDate = dateObj.toLocaleDateString();
              const localTime = dateObj.toLocaleTimeString();

              return (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-200">{index + 1}</td>
                  <td className="p-3 border-b border-gray-200">{payment.email}</td>
                  <td className="p-3 border-b border-gray-200 font-semibold text-green-700">
                    ৳{payment.amount}
                  </td>
                  <td className="p-3 border-b border-gray-200 capitalize">
                    {payment.paymentMethod?.[0] || '-'}
                  </td>
                  <td className="p-3 border-b border-gray-200 font-mono text-sm">
                    {payment.transactionId}
                  </td>
                  <td className="p-3 border-b border-gray-200">{localDate}</td>
                  <td className="p-3 border-b border-gray-200">{localTime}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
