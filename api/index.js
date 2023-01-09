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

// GAMES ROUTER
const gamesRouter = require('./games'); // import the games router
apiRouter.use('/games', gamesRouter); // mount the games router on /api/games


module.exports = apiRouter;
