const express = require('express');
const gamesRouter = express.Router();

const {
    getAllGames
} = require('../db');

gamesRouter.get('/', async (req, res, next) => {
    try {
        const allGames = await getAllGames();
        res.send(allGames);
    } catch (error) {
        next(error);
    }
});
