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

gamesRouter.get('/console/:console', async (req, res, next) => {
    try {
        const games = await Games.getGamesByConsole(req.params.console);
        res.send(games);
    } catch (error) {
        next(error);
    }
});

gamesRouter.get('/year/:year', async (req, res, next) => {
    try {
        const games = await Games.getGamesByYear(req.params.year);
        res.send(games);
    } catch (error) {
        next(error);
    }
});

module.exports = gamesRouter;