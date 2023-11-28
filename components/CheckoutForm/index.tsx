"use client";

import { useState } from 'react';
import { Box, Button, Paper, Stack, TextInput } from '@mantine/core';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    // Add your validation logic for email and fullName here

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
        // You can pass additional details here if required by your backend
        payment_method_data: {
          billing_details: {
            name: fullName,
            email: email
          }
        }
      }
    });

    if (error) {
      alert(error.message);
    }

    setIsProcessing(false);
  };

  return (
    <Paper m={50} shadow={'xl'} w={700} p={24} radius={'md'}>
      <Stack gap={12}>
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <TextInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <PaymentElement />
        <Button mt={20} w={150} onClick={handleSubmit} disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Submit'}
        </Button>
      </Stack>
    </Paper>
  );
};
