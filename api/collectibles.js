const express = require('express');
const collectiblesRouter = express.Router();
const { Collectibles } = require('../db/models/index');
const jwt = require('jsonwebtoken');
const { PK } = require('./PK');

collectiblesRouter.get('/', async(request, response, next) => {
    try {
        const allCollectibles = await Collectibles.getAllCollectibles()
        response.send(allCollectibles)
        console.log("An error occured while getting all collectibles!")
    } catch (error) {
        next(error)
    }
});

collectiblesRouter.post('/', async (request, response, next) => {
    try {
        const newCollectible = await Collectibles.createCollectiblesListing(request.body);
        response.send(newCollectible);
    } catch (error) {
        console.log("An error occured while creating a new collectible listing");
        next(error);
    }
});
