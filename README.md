[![The MIT License](https://img.shields.io/badge/license-MIT-orange.svg?color=blue&style=flat-square)](http://opensource.org/licenses/MIT)
![Coverage](./badges/coverage.svg)

## Table of Contents

- [About](#about)
- [Features](#features)
- [Install](#install)
- [Run](#run)
- [Create an app](#create-an-app)

## About

This is a minimalistic Web framework for Node.js. It helps you create RESTful APIs.

The idea is to have 0 dependencies while still have all the functionality you would expect from bigger frameworks like Express, Koa, Fastify etc with just a fraction of the footprint.

## Features

- Create routes supporting GET, POST, PUT, DELETE HTTP Verbs. There are convenience methods for this:

   ```javascript
   app.get('<path>', (req, res) => {})
   app.post('<path>', (req, res) => {})
   app.put('<path>', (req, res) => {})
   app.delete('<path>', (req, res) => {})
   ```

- Reads posted body to either Text or JSON. Use method `bodyParse(method)` to change how the body is parsed. Valid input values `json` or `text`.
- Has middleware that you can run before handling the actual request. Can be used for Authentication for example.

   ```javascript
   app.get('/products', (req, res, next) => {
     if (req.headers['authorization'] === 'abc123') {
       next();
     } else {
       res.statusCode = 401;
       res.send('Not allowed')
     }
   })
   ```

- Handles route parameters and query parameters

   **Router parameters**

   ```javascript
   app.get('/products/:id', (req, res) => {
     console.log(req.params) // for route /products/1 { id: "1" }
     console.log(req.query) // for route /products?page=1&pageSize=20 { page: "1", pageSize: "20"}
   })
   ```

   **Query parameters** 

   ```javascript
   app.get('/products/', (req, res) => {
     console.log(req.query) // for route /products?page=1&pageSize=20 { page: "1", pageSize: "20"}
   })
   ```

## Install

```
npm install mini-web
```

## Create an app

```javascript
const miniweb = require('mini-web');

const app = miniweb();

// ROUTE PARAMETERS
app.get("/products/:id", (req, res) => {
  console.log("query params", req.query);
  console.log('req.params', req.params);
  res.send("product id");
});

app.get('/products', (req, res) => {
  console.log('query params', req.query)
  res.send('text');
})

// POST
app.post('/products', (req,res) => {
  console.info('body', req.body)
  res.json(req.body);
})

// MIDDLEWARE
app.get('/orders', (req, res, next) => {
  if (req.headers['authorization'] === 'abc123') {
    console.log('next', next)
    next()
  } else {
    res.statusCode = 401;
    res.send('Not allowed')
  }
}, (req, res) => {
  res.send('Protected route');
})

// Starts listening to requests
app.listen(3000, () => {
  console.log('Server running on 3000');
})
```