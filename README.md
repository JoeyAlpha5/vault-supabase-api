# Vault Supabase API

The Vault API handles all necessary requests for creating customers, payment methods and subscriptions using the Stripe API.
Products are loaded on the Stripe dashboard, the GET products endpoint can be used to retrieve all the products that exist in the dashboard.

Customers can be created and retrieved suing the GET Customer , GET Customers and CREATE Customer endpoints.

Once a customer has been created, you can then add a payment method for the customer using the CREATE Customer Payment Method endpoint. You can also retrive a customer's Payment method using the GET Customer Payment Method endpoint.

Subscriptions to products can be created for customers using the CREATE Subscription endpoint once payment methods have been added.


### API endpoint 

Use the following endpoint when making requests:
**https://prncsikwvviobywpyxjp.supabase.co/functions/v1/`api-end-point`**

Replace **`api-end-pont`** with the necessary endpoint name, i.e **`vault-get-products`** to get the products from stripe. Use [this postman documentation](https://documenter.getpostman.com/view/20677220/2s93sZ7aDi) to see all possible requests.