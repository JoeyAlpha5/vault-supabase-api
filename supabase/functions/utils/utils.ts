import Stripe from "stripe";
const stripe: any = new Stripe(Deno.env.get('STRIPE_API_KEY') as string,{
    // This is needed to use the Fetch API rather than relying on the Node http
    // package.
    apiVersion: '2022-11-15',
    httpClient: Stripe.createFetchHttpClient(),
});

export default stripe;