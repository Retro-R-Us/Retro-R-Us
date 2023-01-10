const express = require('express');
const router = express.Router();
const {
    Consoles
} = require('../db/models/index')

router.get('/', async(request, response, next) => {
    try {
        const allConsoles = await getAllConsoles()
        response.send(allConsoles)
    } catch (error) {
        next(error)
    }
})