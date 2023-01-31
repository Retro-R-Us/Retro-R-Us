const express = require('express');
const gamesRouter = express.Router();
const { Games } = require('../db/models/index');

// get all games
gamesRouter.get('/', async (req, res, next) => {
    try {
        const allGames = await Games.getAllGames();
        res.send(allGames);
    } catch (error) {
        next(error);
    }
});

// create a game listing
gamesRouter.post('/', async (req, res, next) => {
    try {
        const newGame = await Games.createGameListing(req.body);
        res.send(newGame);
    } catch (error) {
        next(error);
    }
});

// delete a game listing
gamesRouter.delete('/:gameId', async (req, res, next) => {
    try {
        const gameToDelete = await Games.getGameById(req.params.gameId);
        if (!gameToDelete) {
            throw {
                name: 'ErrorGameNotFound',
                message: 'Could not find a game by that gameId'
            };
        }

        const deletedGame = await Games.deleteGameListing(req.params.gameId);
        res.send(deletedGame);
    } catch (error) {
        next(error);
    }
});

// get game by id
gamesRouter.get('/:gameId', async (req, res, next) => {
    try {
        const game = await Games.getGameById(req.params.gameId);
        res.send(game);
    } catch (error) {
        next(error);
    }
});

// update a game listing
gamesRouter.patch('/:gameId', async (req, res, next) => {
    try {
        const gameToUpdate = await Games.getGameById(req.params.gameId);
        if (!gameToUpdate) {
            throw {
                name: 'ErrorGameNotFound',
                message: 'Could not find a game by that gameId'
            };
        }

        const updatedGame = await Games.updateGameListing(req.params.gameId, req.body);
        res.send(updatedGame);
    } catch (error) {
        next(error);
    }
});

// get games by console
gamesRouter.get('/console/:console', async (req, res, next) => {
    try {
        const games = await Games.getGamesByConsole(req.params.console);
        res.send(games);
    } catch (error) {
        next(error);
    }
});

// get games by year
gamesRouter.get('/year/:year', async (req, res, next) => {
    try {
        const games = await Games.getGamesByYear(req.params.year);
        res.send(games);
    } catch (error) {
        next(error);
    }
});

module.exports = gamesRouter;