const express = require('express');
const collectiblesRouter = express.Router();
const { Collectibles } = require('../db/models/index');
const jwt = require('jsonwebtoken');

collectiblesRouter.get('/', async(request, response, next) => {
    try {
        const allCollectibles = await Collectibles.getAllCollectibles()
        response.send(allCollectibles)
    } catch (error) {
        next(error)
    }
});

collectiblesRouter.post('/', async (request, response, next) => {
    try {
        const newCollectible = await Collectibles.createCollectibleListing(request.body);
        response.send(newCollectible);
    } catch (error) {
        next(error);
    }
});

collectiblesRouter.get('/:collectibleId', async (request, response, next) => {
    try {
        const collectible = await Collectibles.getCollectibleById(request.params.collectibleId);
        response.send(collectible);
    } catch (error) {
        next(error);
    }
});

collectiblesRouter.patch('/:collectibleId', async (request, response, next) => {
    try {
        const collectibleToUpdate = await Collectibles.getCollectibleById(request.params.collectibleId);
        if (!collectibleToUpdate) {
            throw {
                name: 'ErrorCollectibleNotFound',
                message: 'Could not find a collectible by that collectibleId'
            };
        }

        const updatedCollectible = await Collectibles.updateCollectiblesListing(request.params.collectibleId, request.body);
        response.send(updatedCollectible);
    } catch (error) {
        next(error);
    }
    });

collectiblesRouter.delete('/:collectibleId', async (request, response, next) => {
    try {
        const collectibleToDelete = await Collectibles.getCollectibleById(request.params.collectibleId);
        if (!collectibleToDelete) {
            throw {
                name: 'ErrorCollectibleNotFound',
                message: 'Could not find a collectible by that collectibleId'
            };
        }

        const deletedCollectible = await Collectibles.deleteCollectiblesListing(request.params.collectibleId);
        response.send(deletedCollectible);
    } catch (error) {
        next(error);
    }
});

collectiblesRouter.get('/console/:console', async (request, response, next) => {
    try {
        const collectibles = await Collectibles.getCollectiblesByConsole(request.params.console);
        response.send(collectibles);
    } catch (error) {
        next(error);
    }
});

    module.exports = collectiblesRouter;
