// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "deno";
import stripe from "../utils/utils.ts";

serve(async (req) => {
  // get search keywords from request if any
  const { search } = await req.json();
  const search_submitted: bool = search;


  // get products from stripe
  try{
    let products = await stripe.products.list({
      expand: ["data.default_price"]
    });
    
    if(search_submitted){
      products = await stripe.products.search({
        expand: ["data.default_price"],
        query: 'name~\''+search+'\' OR description~\''+search+'\'',
      });
    }

    return new Response(
      JSON.stringify(products.data),
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
