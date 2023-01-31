const express = require('express');
const cartRouter = express.Router();
const { Cart } = require('../db/models/index');

cartRouter.post("/", async (req, res, next) => {
    try {
        const { orderId, quantity, userId } = req.body;
        const newOrder = await Cart.addItemToCart ({ orderId, quantity, userId });
        res.send(newOrder);
    } catch (error) {
        console.error("Could not add item to cart")
        throw error;
    }
})

cartRouter.delete("/:cartId", async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const cart = await Cart.getOrderById(cartId);
        
            const deletedCart = await Cart.destroyCart(cartId);
            res.send(deletedCart);

    } catch (error) {
        console.error("Could not delete cart")
        throw error;
    }
})

cartRouter.patch("/:cartId", async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const cart = await Cart.getOrderById(cartId);
        
            const updatedCart = await Cart.updateCart({id: cartId, ...req.body});
            res.send(updatedCart);
        
    } catch (error) {
        console.error("Could not update cart")
        throw error
    }
})


module.exports = cartRouter;
