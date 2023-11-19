"use client";

import { Box, Button, Stack, Text, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from '@/components/CheckoutForm';


export default function Home() {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    (async () => {
      const t = await loadStripe('pk_live_51MzlPfFjkPZRdnX1xG5oZ2f5LVylisRVV2O6Ym7c20knPF5GsjuKfcdl6fE3oXmqLIKwjhNNw4id48bpOXOC4n3R00zouqX2k9')
      setStripePromise(t)
    })()
  }, [])

  const createPayment = (amount: string) => {
    fetch('/api?' + new URLSearchParams({
      amount
    })).then(async(r) => {
      const res = await r.json();
      setClientSecret(res.clientSecret)
    })
  }

  const [customAmount, setCustomAmount] = useState('')
  const handleSubmit = () => {
    createPayment(customAmount)
  }

  return <Box>
    <Stack gap={12} m={50}>
      <Text size={'xl'}>Generate payment form:</Text>
      <TextInput withAsterisk label={'Amount $'} w={500} value={customAmount} onChange={e => setCustomAmount(e.target.value)} />
      <Button w={150} onClick={handleSubmit}>
        Create
      </Button>
    </Stack>
    {
      stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )
    }
  </Box>;
}
