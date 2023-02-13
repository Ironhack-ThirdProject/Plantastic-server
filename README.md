<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/dm6a8aocc/image/upload/v1676302000/third-project/image-name-removebg-preview_ppgy33.png">
  <source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/dm6a8aocc/image/upload/v1676296604/third-project/image-name-removebg-preview_naj2ku.png">
  <img alt="Plantastic logo" src="https://res.cloudinary.com/dm6a8aocc/image/upload/v1676296604/third-project/image-name-removebg-preview_naj2ku.png">
</picture>

# Plantastic

Plantastic is an e-commerce website built with the MERN stack dedicated to offering a unique shopping experience for plant enthusiasts. 

The design is responsive, providing an optimal user experience across all devices. 

Users can easily manage their cart, post reviews, complete secure transactions using Stripe, and receive confirmation emails for their orders. 

The admin is also equipped with a dynamic dashboard, displaying sales and inventory data in real-time.

![App Screenshot](https://res.cloudinary.com/dm6a8aocc/image/upload/v1676314171/third-project/calamnsi_s6zsx9.png)

## Authors

- [@vrabec94](https://github.com/vrabec94)
- [@marinedrp](https://github.com/marinedrp)


## Tech Stack

**Client:** React.js, Chart.js, MDBootstrap

**Server:** MongoDB, Express.js, Node.js, Stripe, Nodemailer, Cloudinary

## Table of Contents

* [Features](#features)
  - [Admin Features](#admin-features)
  - [Customer Features](#customer-features)
* [API Reference and Endpoints](#api-reference-and-endpoints)
    - [Authentication](#authentication)
    - [Plants](#plants)
    - [Cart](#cart)
    - [Order](#order)
    - [Payment](#payment)
    - [Reviews](#reviews)
* [Environment Variables](#environment-variables)
    - [Nodemailer](#nodemailer)
    - [Cloudinary](#cloudinary)
    - [Stripe](#stripe)
* [Run Locally](#run-locally)
* [Demo](#demo)
* [Roadmap](#roadmap)
* [Client](#client)

## Features

- Responsive Web Design
- RESTful API
- User Authentication
- Protected routes
- Conditional rendering
- Search Product by Category
- Average star rating for each product

### Admin Features
- **Product and Inventory Management:** admins can create, edit and delete all products of the website.
- **Admin Dashboard built with Chart.js:** Admin have access to real-time data visualizations of key performance indicators and financial metrics enabling informed decision making.
    - **Financial data:** line chart with monthly revenue and orders, total orders, average order value and average products ordered.
    - **Inventory data:** total stock, inventory count and unique products by tag and category displayed with dougnhut charts and tables, low stock products (10 items or less).

### Customer Features
- **Shopping Cart:** customers can manage their purchases with a real-time shopping cart that allows for adding, editing and removing products.
- **Reviews:** customers can create, edit and delete their reviews for each product.
- **Star rating system:** users can add and modify their rating for each review.
- **User profile:** users can keep track of their order history, see and edit or delete their reviews directly in their profile.
- **Secure payment processing:** payments are processed via a secure Stripe checkout session, with customers redirected to a confirmation page after payment completion or cancellation.
- **Confirmation e-mail:** customers receive personalized confirmation emails via Nodemailer, upon successful payment completion.

## API Reference and Endpoints

### Authentication

| Method | URL     | Description                |
| :-------- | :------- | :------------------------- |
| `POST` | `/auth/signup` | Create an account. |
| `POST` | `/auth/login` | Login. |
| `GET` | `/auth/verify` | Verify a JSON Web Token. |


### Plants

| Method | URL     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `/plants` | Retrieve all plants. |
| `GET` | `/plants/:productId` | Retrieve a specific plant. |
| `POST` | `/plants` | Create a  plant. |
| `PUT` | `/plants/:productId` | Edit a plant. |
| `DELETE` | `/plants/:productId` | Delete a plant. |


### Cart

| Method | URL     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `/cart` | Retrieve the user's cart. |
| `POST` | `/cart` | Create a cart/Add products to the user's cart. |
| `PUT` | `/cart/:productId` | Update the quantity of an item in the current user's shopping cart. |
| `DELETE` | `/cart/:productId` | Remove an item from the current user's shopping cart. |


### Order

| Method | URL     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `/order` | Retrieve all orders. |
| `GET` | `/order/:userId` | Retrieve all orders of a specific user. |


### Payment

| Method | URL     | Description                |
| :-------- | :------- | :------------------------- |
| `POST` | `/checkout` | Create a Stripe Checkout Session. |
| `POST` | `/webhook` | Receive webhook events from Stripe and update the order accordingly. |


### Reviews

| Method | URL     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `/reviews/user/:userId` | Retrieve all reviews of a user. |
| `GET` | `/reviews/product/:productId` | Retrieve all reviews of a product. |
| `POST` | `/reviews` | Create a review. |
| `PUT` | `/reviews/:reviewId` | Edit a review. |
| `DELETE` | `/reviews/:reviewId` | Delete a review. |


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

`PORT`: Port of your server on localhost

`ORIGIN`: URL of the client

`TOKEN_SECRET`: Your token secret

### Nodemailer

`TRANSPORTER_EMAIL`: The e-mail of the transporter

`TRANSPORTER_PASSWORD`: The password of the transporter

### Cloudinary

`CLOUDINARY_NAME`: Your Cloud name

`CLOUDINARY_KEY`: Your Cloudinary key

`CLOUDINARY_SECRET`: Your Cloudinary secret

### Stripe

`STRIPE_KEY`: Your Stripe key


## Run Locally

Clone the project:

```bash
  git clone https://github.com/Ironhack-ThirdProject/Plantastic-server
```

Install the dependencies:

```bash
  npm install
```

Start the server:

```bash
  npm run dev
```


## Demo

Deployed project on Netlify: https://plantastic-shop.netlify.app/




## Client

You can check out the repository of the client [here](https://github.com/Ironhack-ThirdProject/Plantastic-client).