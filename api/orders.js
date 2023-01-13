const express = require('express');
const ordersRouter = express.Router();
const { Orders } = require('../db/models/index');

ordersRouter.get('/', async (req, res, next) => {
    try {
    const { userId } = req.body;
    const orders = await Orders.getAllOrders(userId);
    res.send(orders)
    } catch (error) {
        console.error("Could not get orders");
        throw error;
    }
})

ordersRouter.post('/', async (req, res, next) => {
    try {
        const { id, status, cart } = req.body;
        const orders = await Orders.createOrder({ id, status, cart });
        res.send(orders);
    } catch (error) {
        console.error("Could not create order");
        throw error;
    }
})

ordersRouter.patch('/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { status, cart } = req.body;
        const update = await Orders.updateOrder({ id: orderId, status, cart });
        res.send(update);
    } catch (error) {
        console.error("Could not update order");
        throw error;
    }
})

module.exports = ordersRouter