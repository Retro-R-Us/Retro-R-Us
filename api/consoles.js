const express = require('express');
const consolesRouter = express.Router();
const { Consoles } = require('../db/models/index');
const jwt = require('jsonwebtoken');


consolesRouter.get('/', async(request, response, next) => {
    try {
        const allConsoles = await Consoles.getAllConsoles()
        response.send(allConsoles)
    } catch (error) {
        next(error)
    }
});

consolesRouter.post('/', async (request, response, next) => {
    try {
        const newConsole = await Consoles.createConsoleListing(request.body);
        response.send(newConsole);
    } catch (error) {
        next(error);
    }
});

consolesRouter.get('/:consoleId', async (request, response, next) => {
    try {
        const console = await Consoles.getConsolesById(request.params.consoleId);
        response.send(console);
    } catch (error) {
        next(error);
    }
});

consolesRouter.patch('/:consoleId', async (request, response, next) => {
    try {
        const consoleToUpdate = await Consoles.getConsolesById(request.params.consoleId);
        if (!consoleToUpdate) {
            throw {
                name: 'ErrorConsoleNotFound',
                message: 'Could not find a console by that consoleId'
            };
        }

        const updatedConsole = await Consoles.updateConsoleListing(request.params.consoleId, request.body);
        response.send(updatedConsole);
    } catch (error) {
        next(error);
    }
});

consolesRouter.get('/year/:year', async (request, response, next) => {
    try {
        const consoles = await Consoles.getConsolesByYear(request.params.year);
        response.send(consoles);
    } catch (error) {
        next(error);
    }
 });
    

consolesRouter.delete('/:consoleId', async (request, response, next) => {
    try {
        const consoleToDelete = await Consoles.getConsolesById(request.params.consoleId);
        if (!consoleToDelete) {
            throw {
                name: 'ErrorConsoleNotFound',
                message: 'Could not find a console by that consoleId'
            };
        }

        const deletedConsole = await Consoles.deleteConsoleListing(request.params.consoleId);
        response.send(deletedConsole);
    } catch (error) {
        next(error);
    }
});
    

module.exports = consolesRouter;
