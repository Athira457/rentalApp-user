// components/Payment.tsx
"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}
interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    handler: (response: RazorpayResponse) => void;
    prefill: {
      email: string;
      contact: string;
    };
  }
  
  interface RazorpayInstance {
    open(): void;
  }
  
  declare global {
    interface Window {
      Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
    }
  }
const Payment: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const amount = searchParams.get('amount');
  const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID

  useEffect(() => {
    if (!bookingId || !amount) {
      return;
    }

    const loadRazorpay = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => openRazorpay();
      script.onerror = () => console.error('Failed to load Razorpay SDK');
      document.body.appendChild(script);
    };

    const openRazorpay = () => {
      const options = {
        key: razorpayKeyId as string, 
        amount: parseInt(amount, 10) * 100, 
        currency: 'INR',
        name: 'Car Rental Service',
        description: `Payment for booking ${bookingId}`,
        handler: (response: RazorpayResponse) => {
          console.log('Payment successful:', response);
          router.push(`/booking-success?bookingId=${bookingId}`);
        },
        prefill: {
          name: 'Your Name',
          email: 'your.email@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#F37254',
        },
      };

      // Use the Razorpay instance on window
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };

    loadRazorpay();
  }, [bookingId, amount, razorpayKeyId, router]);

  return (
    <div>
      <h1>Processing Payment...</h1>
    </div>
  );
};

export default Payment;
