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

// get accessories by console

// create an accessory listing

// update an accessory listing

// delete an accessory listing

module.exports = accessoriesRouter;
