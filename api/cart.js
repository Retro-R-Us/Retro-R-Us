const express = require('express');
const cartRouter = express.Router;
const { Cart } = require('../db/models/index');

cartRouter.post("/", async (req, res, next) => {
    try {
        const { orderId, quantity } = req.body;
        const newOrder = await Cart.addItemToCart ({ orderId, quantity });
        res.send(newOrder);
    } catch (error) {
        console.error("Could not add item to cart")
        throw error;
    }
})

cartRouter.delete("/:cartId", async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const cart = await Cart.getOrderById(id);
        if (req.cart === cart.cartId) {
            const deletedCart = await Cart.destroyCart(cartId);
            res.send(deletedCart);
        }

    } catch (error) {
        console.error("Could not delete cart")
        throw error;
    }
})

cartRouter.patch("/:cartId", async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const cart = await Cart.getOrderById(id);
        if (req.cart === cart.cartId) {
            const updatedCart = await updateCart(cartId);
            res.send(updatedCart);
        }
        
    } catch (error) {
        console.error("Could not update cart")
        throw error
    }
})


module.exports = cartRouter;