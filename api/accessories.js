const express = require('express');
const accessoriesRouter = express.Router();
const { Acc } = require('../db/models/index');

// get all accessories
accessoriesRouter.get('/', async (req, res, next) => {
    try {
        const allAccessories = await Acc.getAllAccessories();
        res.send(allAccessories);
    } catch (error) {
        console.log("An error occured while retrieving all accessories");
        next(error);
    }
});

// get accessory by id
accessoriesRouter.get('/:accessoryId', async (req, res, next) => {
    try {
        const accessory = await Acc.getAccessoryById(req.params.accessoryId);
        res.send(accessory);
    } catch (error) {
        console.log("An error occured while retrieving an accessory by that ID");
        next(error);
    }
});

// get accessories by console
accessoriesRouter.get('/console/:console', async (req, res, next) => {
    try {
        const accessories = await Acc.getAccessoriesByConsole(req.params.console);
        res.send(accessories);
    } catch (error) {
        console.log("An error occured while retrieving accessories by that console");
        next(error);
    }
});

// create an accessory listing
accessoriesRouter.post('/', async (req, res, next) => {
    try {
        const newAccessory = await Acc.createAccessoryListing(req.body);
        res.send(newAccessory);
    } catch (error) {
        console.log("An error occured while creating a new accessory listing");
        next(error);
    }
});

// update an accessory listing

// delete an accessory listing

module.exports = accessoriesRouter;
