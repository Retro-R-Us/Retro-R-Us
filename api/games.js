const express = require('express');
const gamesRouter = express.Router();
const { Games } = require('../db/models/index');

gamesRouter.get('/', async (req, res, next) => {
    try {
        const allGames = await Games.getAllGames();
        res.send(allGames);
    } catch (error) {
        next(error);
    }
});

gamesRouter.get('/:gameId', async (req, res, next) => {
    try {
        const game = await Games.getGameById(req.params.gameId);
        res.send(game);
    } catch (error) {
        next(error);
    }
});

module.exports = gamesRouter;