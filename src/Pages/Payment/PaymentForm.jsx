import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth()
  const navigate = useNavigate();

  const { data: parcelInfo = {} } = useQuery({
    queryKey: ['parcels', parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
    enabled: !!parcelId,
    onError: (error) => {
      setError(error.message);
    }
  });

  const amount = parcelInfo?.cost || 0;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: methodError } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (methodError) {
      setError(methodError.message);
      return;
    }

    try {
      const res = await axiosSecure.post('/create-payment-intent', {
        amountInCents,
        parcelId,
      });

      const clientSecret = res.data.clientSecret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setError('');
        if (result.paymentIntent.status === 'succeeded') {
          console.log('Payment successful!');

          const paymentData = {
            parcelId,
            amount,
            transactionId: result.paymentIntent.id,
            paymentMethod: result.paymentIntent.payment_method_types,
            email: user.email,
          }
          const paymentRes = await axiosSecure.post('/payments', paymentData);
          if (paymentRes.data.insertedId) {
            await Swal.fire({
              icon: 'success',
              title: 'Payment Successful!',
              text: `Your payment of $${amount} has been processed successfully.`,
              confirmButtonText: 'Go to my parcels',
            });
            navigate(`/dashboard/myParcels`);
          }
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto'
      >
        <CardElement className='p-2 border rounded' />
        <button
          type="submit"
          className='btn bg-[#CAEB66] w-full'
          disabled={!stripe}
        >
          Pay ${amount} for parcel pickup
        </button>
        {error && <p className='text-red-500 font-semibold'>{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
