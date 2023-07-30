// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "deno";
import stripe from "../utils/utils.ts";

serve(async (req) => {

  // stripe payment intent
  let paymentIntent = await stripe.paymentIntents.create({
    amount: 4000,
    currency: 'usd',
    payment_method_types: ['card']
  });

  return new Response(
    JSON.stringify(paymentIntent),
  );

})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/vault-get-payment-intent/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
