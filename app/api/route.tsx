import { NextApiRequest } from 'next';
import { NextRequest } from 'next/server';

const stripe = require('stripe')('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');

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get('amount') as string;
  if (!name) Response.json({
    error: 'Error'
  })
  const paymentIntent = await stripe.paymentIntents.create({
    currency: 'usd',
    amount: name,
    automatic_payment_methods: {
      enabled: true
    }
  })

  return Response.json({
    clientSecret: paymentIntent.client_secret
  })
}