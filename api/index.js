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
const userRouter = require('./user')
apiRouter.use('/user', userRouter)

const consolesRouter = require('./consoles')
apiRoputer.use('/consoles', consolesRouter)

const collectiblesRouter = require('./collectibles')
apiRouter.use('/collectibles', collectiblesRouter)

apiRouter.get('*', (req, res, next) => {
  const err = new Error()
  err.status = 404;
  next(err)
})

apiRouter.use((err, req, res, next) => {
  if (err.status === 404) {
    err.title = 'Page Not Found'
    res.status(404);
    res.send(err);
  }
  else {
    return next();
  }
})

// GAMES ROUTER
const gamesRouter = require('./games'); // import the games router
apiRouter.use('/games', gamesRouter); // mount the games router on /api/games


//ROUTER: /api/cart
const cartRouter = require('./cart');
Router.use("/cart", cartRouter);

module.exports = apiRouter;
