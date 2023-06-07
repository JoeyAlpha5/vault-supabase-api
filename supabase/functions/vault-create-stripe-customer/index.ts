// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "deno";
import stripe from "../utils/utils.ts";

serve(async (req) => {
  // create a customer in stripe
  try{
    const { email, name } = await req.json();
    const email_and_name_not_provided: bool =  !email || !name;

    if (email_and_name_not_provided) {
      return new Response(
        JSON.stringify({ error: "email & name are required" }),
        { headers: { "Content-Type": "application/json" } },
      )
    }

    const customer = await stripe.customers.create({
      description: `Customer for ${email}`,
      email: email,
      name: name,

    });
    return new Response(
      JSON.stringify(customer),
      { headers: { "Content-Type": "application/json" } },
    )
  }
  catch(err){
    return new Response(
      JSON.stringify(err),
      { headers: { "Content-Type": "application/json" } },
    )
  }
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
