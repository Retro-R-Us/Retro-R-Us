const express = require('express');
const accessoriesRouter = express.Router();
const { Acc } = require('../db/models/index');


accessoriesRouter.get('/', async (req, res, next) => {
    try {
        const allAccessories = await Acc.getAllAccessories();
        res.send(allAccessories);
    } catch (error) {
        next(error);
    }
});


accessoriesRouter.get('/:accessoryId', async (req, res, next) => {
    try {
        const accessory = await Acc.getAccessoryById(req.params.accessoryId);
        res.send(accessory);
    } catch (error) { 
        next(error);
    }
});


accessoriesRouter.get('/console/:console', async (req, res, next) => {
    try {
        const accessories = await Acc.getAccessoriesByConsole(req.params.console);
        res.send(accessories);
    } catch (error) {
        next(error);
    }
});


accessoriesRouter.post('/', async (req, res, next) => {
    try {
        const newAccessory = await Acc.createAccessoryListing(req.body);
        res.send(newAccessory);
    } catch (error) {
        next(error);
    }
});


accessoriesRouter.patch('/:accessoryId', async (req, res, next) => {
    try {
        const accessoryToUpdate = await Acc.getAccessoryById(req.params.accessoryId);
        if (!accessoryToUpdate) {
            throw {
                name: 'ErrorAccessoryNotFound',
                message: 'Could not find an accessory by that accessoryId'
            };
        }

        const updatedAccessory = await Acc.updateAccessoryListing(req.params.accessoryId, req.body);
        res.send(updatedAccessory);
    } catch (error) {
        next(error);
    }
});


accessoriesRouter.delete('/:accessoryId', async (req, res, next) => {
    try {
        const accessoryToDelete = await Acc.getAccessoryById(req.params.accessoryId);
        if (!accessoryToDelete) {
            throw {
                name: 'ErrorAccessoryNotFound',
                message: 'Could not find an accessory by that accessoryId'
            };
        }

        const deletedAccessory = await Acc.deleteAccessoryListing(req.params.accessoryId);
        res.send(deletedAccessory);
    } catch (error) {
        next(error);
    }
});

module.exports = accessoriesRouter;
