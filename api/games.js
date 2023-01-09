const express = require('express');
const gamesRouter = require('./games');

const {
    // put db methods here
} = require('../db');

// as of now, i havent configured the http routes yet
// gets all games
gamesRouter.get('/', async (req, res, next) => {
    try {
        const allGames = await getAllGames();
        res.send(allGames);
    } catch (error) {
        next(error);
    }
});
