const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../db/models/index');
const SALT = 10;

userRouter.get('/me', async (req, res, next) => {
    
})

userRouter.get('/admin', async (req, res, next) => {
    const { username } = req.body;
    const user = await User.getUserByUsername(username);
    if (!user.admin) {
        const err = new Error()
        err.status = 401;
        err.title = "Unauthorized."
        res.status(401)
        next(err)
    } else {
        res.status(200)
        res.send({
            Success: true,
            Message: "Please login with your credentials to access the admin console."
        })
    }
})

userRouter.post('/login', async (req, res, next) => {
    
})

userRouter.post('/register', async (req, res, next) => {
    
})

userRouter.patch('/update', (req, res, next) => {

})

module.exports = userRouter;