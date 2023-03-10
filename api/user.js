const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env
const { User, Orders } = require('../db/models/index');

userRouter.get('/me', async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        const tokenString = authorization.slice(7, -1);
        const tokenCheck = jwt.decode(tokenString);
        
        const userdata = await User.getUserByUsername(tokenCheck.username)

        if (authorization === undefined) {
            res.status(401)
            res.send({
                error: "Not Authorized",
                name: "Auth Error",
                message: "You must be logged in to perform this action"
              })
        } else {
            const orders = await Orders.getOrdersByUser(tokenCheck.id);
            const userData = {
                Success: true,
                user: userdata.userData,
                orders: orders
            }
            res.send(userData)
        }

    } catch (error) {
        next(error)
    }
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

        if (!(username && password)) {
            res.status(400);
                res.send({
                    Success: false,
                    Message: "A required field was missing. Please fill all out all required fields."
                })
        }

        const user = await User.getUserByUsername(username);
        if (user.Success === true) {
            const passCheck = await User.getPass(username, password);
            if (passCheck.Success === false) {
                res.status(400);
                res.send({
                    Success: false,
                    Message: "Incorrect Username or Password."
                })
            } else {
                const login = await User.userLogin(req.body);
                const token = jwt.sign({id: user.userData.id, username: username}, JWT_SECRET)
                login.userdata.token = token;
                res.status(200);
                res.send(login);
            }
        } else if (user.Success === false) {
            res.status(400);
            res.send({
                Success: false,
                Message:  `${user.Message}. Please sign up for an account.`
            })
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
            res.status(201)
            res.send(response)
        }
    } catch (error) {
        next(error)
    }
})

userRouter.patch('/update', async (req, res, next) => {
    try {
        const { username, oldPassword, newPassword } = req.body;
        const { authorization } = req.headers;

        if (authorization === undefined) {
            res.status(401)
            res.send({
                Success: false,
                name: "Token Error",
                error: "No Token supplied",
                message: "You must be logged in to perform this action"
            })
        } else if (!newPassword) {
            res.status(401)
            res.send({
                Success: false,
                name: "Password Error",
                error: "Missing Password",
                message: "Please include your new password with this request."
        })
        };

        const tokenString = authorization.slice(7, -1);
        const tokenCheck = jwt.decode(tokenString);

        if (tokenCheck.username !== username) {
            res.status(401)
            res.send({
                Success: false,
                name: "Token Error",
                error: "Token Invalid",
                message: "This is not your token"
        })
        }

        const userPass = await User.getPass(username, oldPassword);
        if (!userPass.Success) {
            res.status(400)
            res.send({
                Success: false,
                name: "Password Error",
                error: "Bad Password",
                message: "Your password is incorrect. Please try again."
            })
        } else {
            const response = await User.newPassword(req.body);
            res.send(response);
        }

    } catch (error) {
        next(error)
    }
})

module.exports = userRouter;