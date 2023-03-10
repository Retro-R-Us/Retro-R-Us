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

const userRouter = require('./user');
apiRouter.use('/user', userRouter);

const accessoriesRouter = require('./accessories');
apiRouter.use('/accessories', accessoriesRouter);

const consolesRouter = require('./consoles');
apiRouter.use('/consoles', consolesRouter);

const ordersRouter = require('./orders');
apiRouter.use("/order", ordersRouter);

const gamesRouter = require('./games'); 
apiRouter.use('/games', gamesRouter); 

const cartRouter = require('./cart');
apiRouter.use('/cart', cartRouter);

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
    return next(err);
  }
})

module.exports = apiRouter;
