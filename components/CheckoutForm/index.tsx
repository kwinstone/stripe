"use client";

import { Box, Button, Paper } from '@mantine/core';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!stripe || !elements) return;

    setIsProcessing(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`
      }
    })

    if (error) {
      alert(error.message)
    }

    setIsProcessing(false)
  }

  return (
    <Paper m={50} shadow={'xl'} w={700} p={24} radius={'md'}>
      <Box>
        <PaymentElement />
        <Button mt={20} w={150} onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Paper>
  )
}