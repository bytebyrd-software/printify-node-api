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

### 3.3 `webhooks` collection

## 4. Events

For information about printify's events please visit the [Printify API Reference](https://developers.printify.com/#events)
