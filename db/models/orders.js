const client = require("../client");

async function createOrder({userId, status}) {
    try {
        const { rows: [order] } = await client.query(`
        INSERT INTO orders("userId", status)
        VALUES($1, $2)
        RETURNING *
        `, [userId, status]);
        
        return order;
    } catch (error) {
        console.error("Failed to create order");
        throw error;
    }
}

async function getAllOrders() {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM orders;
        `)

        return rows;
    } catch (error) {
        console.error("Could not load orders");
        throw error;
    }
}

async function getOrdersByUser(id) {
    try {
        const { rows: [order] } = await client.query(`
        SELECT *
        FROM orders
        WHERE "userId"=$1;
        `, [id]);

        return order;
    } catch (error) {
        console.error("Could not get orders");
        throw error;
    }
}

async function getOrdersById(id) {
    try {
        const { rows: [order] } = await client.query(`
        SELECT *
        FROM orders
        WHERE "orderId"=$1;
        `, [id]);

        return order;
    } catch (error) {
        console.error("Could not get order by id");
        throw error;
    }
}

async function updateOrder({ id, status, cart }) {
    try {
        const order = await getOrdersById(id);
        const fields = {};

        if (!order) {
            return;
        }
        if (status) {
            fields.status = status;
        }
        if (cart) {
            fields.cart = cart;
        }

        const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`)
        .join(", ");

        if (setString === 0) {
            return;
        }

        const { rows: [updateOrder] } = await client.query(`
        UPDATE orders
        SET ${setString}
        WHERE "orderId"=${id}
        RETURNING *;
        `, Object.values(fields));

        return updateOrder;
    } catch (error) {
        console.error("Could not update cart");
        throw error;
    }
}


module.exports = {
    createOrder,
    getAllOrders,
    getOrdersByUser,
    getOrdersById,
    updateOrder,
}