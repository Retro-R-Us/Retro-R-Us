const express = require('express');
const consolesRouter = express.Router();
const { Consoles } = require('../db/models/index');
const jwt = require('jsonwebtoken');
const { PK } = require('./PK');


consolesRouter.get('/', async(request, response, next) => {
    try {
        const allConsoles = await Consoles.getAllConsoles()
        response.send(allConsoles)
        console.log("An error occured while getting all consoles!")
    } catch (error) {
        next(error)
    }
});

consolesRouter.post('/', async (request, response, next) => {
    try {
        const newConsole = await Consoles.createConsoleListing(request.body);
        response.send(newConsole);
    } catch (error) {
        console.log("An error occured while creating a new console listing");
        next(error);
    }
});