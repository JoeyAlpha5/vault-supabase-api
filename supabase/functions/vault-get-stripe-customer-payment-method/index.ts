// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "deno"
import stripe from "../utils/utils.ts"

serve(async (req) => {
  const { customer } = await req.json()
  const customer_not_submitted: bool =  !customer;

  if (customer_not_submitted) {
    return new Response(
      JSON.stringify({ error: "customer is required to get payment methods" }),
      { headers: { "Content-Type": "application/json" } },
    )
  }

  try{
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customer,
      type: 'card',
    });

    return new Response(
      JSON.stringify(paymentMethods),
      { headers: { "Content-Type": "application/json" } },
    )
  }
  catch(err){
    return new Response(
      JSON.stringify({ error: err.message }),
      { headers: { "Content-Type": "application/json" } },
    )
  }

})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
