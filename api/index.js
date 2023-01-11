const { Router } = require('express');
const cartRouter = require('./cart');

const apiRouter = require('express').Router();

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here

//ROUTER: /api/cart
const cartRouter = require('./cart');
apiRouter.use("/cart", cartRouter);

module.exports = apiRouter;
