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
    try {
        const { username, password } = req.body;

        const user = await User.getUserByUsername(username);
    
        if (!(username && password)) {
            const err = new Error()
            err.status = 400;
            err.message = "Username/Password field missing. Please fill out both fields."
            res.status(400)
            next(err)
        } else if (!(user.id && user.email && user.username)) {
            const err = new Error()
            err.status = 400;
            err.message = "User does not exist. Please sign up for an account."
            res.status(400)
            next(err)
        } else {
            const hashedPassword = await bcrypt.hash(password, SALT)
            const user = await User.userLogin(req.body);
            const token = jwt.sign({username: username}, hashedPassword)
            user.userData.token = token;
            console.log("USER DATA:", user)
            res.status(200);
            res.send(user);
        }
        
    } catch (error) {
        next(error)
    }
})

userRouter.post('/register', async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        if (!(username && password && email)) {
            res.status(400);
            res.send({
                Success: false,
                Message: "A required field was missing. Please input required fields."
            });
        } else {
            const response = await User.createUser(req.body);
            res.status(200)
            res.send(response)
        }
    } catch (error) {
        next(error)
    }
})

userRouter.patch('/update', (req, res, next) => {

})

module.exports = userRouter;