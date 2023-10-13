# printify-node-api

## 1. Installation

```bash
npm install printify-node-api
```

## 2. Usage

Just require the Printify class by typing:

```javascript
const Printify = require('printify-node-api');

const API = new Printify( 'myShopId', options)
```

## 3. Collections

### 3.1 `products` collection

Access your products via `API.products` and the respective method.

```javascript
//Create a product
API.products.create(payload);

//Get all products
API.products.getAll()
.then(response => console.log(response.data))
.catch( err => console.log(err.message));

//Get a single product
API.products.getById('yourProductId')
.then(response => console.log(response.data))
.catch( err => console.log(err.message));

//Update a product
API.products.update('yourProductId', payload);

//Delete a product
API.products.delete('yourProductId');

//Publish a new product

//TODO 

//Unpublish a published product

//TODO
```

### 3.2 `orders` collection

Access your orders via `API.orders` and the respective method.

```javascript
//Create an order
API.orders.create(payload);

//Get all orders
API.orders.getAll()
.then(response => console.log(response.data))
.catch( err => console.log(err.message));

//Get a single order
API.orders.getById('yourProductId')
.then(response => console.log(response.data))
.catch( err => console.log(err.message));

//Update an order
API.orders.update('yourProductId', payload);

//Delete an order
API.orders.delete('yourProductId');

//Send an order to production

//TODO 

//Calculate shipping costs of an order

//TODO
```

### 3.3 `webhooks` collection

//TODO

## 4. Events

If you use the printify-node-api in combination with express, you can register an endpoint for the printify webhooks. Events will be sent to the defined endpoint and whenever and event arrives at this endpoint, the printify-node-api will emit an event of the event type that has been received.

You can then listen to these events and implement your own handlers to react to these events.

**WARNING: Printify does not provide webhooks for local test environments. This feature can only be used in production or if your express server is reachable.**

```javascript
const express = require('express');

const app = express();
/** Your express setup **/

//Register an endpoint for your events
API.registerWebhookEndpoint(app, '/webhooks', whsec);

//Listen to events. Only events with a registered webhook will be fired by printify
// The event will be passed to the listener

API.on('order:created', (event) => {
    /*** your listener implementation***/
})
```

//TODO

For information about printify's events please visit the [Printify API Reference](https://developers.printify.com/#events)
