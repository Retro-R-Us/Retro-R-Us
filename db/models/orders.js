const client = require("./client");

async function createOrder({
    userId, status, cart
}) {
    try {
        const { rows: [order] } = await client.query(`
        INSERT INTO orders( "userId", status, cart)
        VALUES($1, $2, $3)
        RETURNING *
        `, [userId, status, cart]);
        
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

async function getOrdersByUser({username}) {
    try {
        const user = await getUserByUsername(username);
        const { rows: [order] } = await client.query(`
        SELECT *
        FROM orders
        JOIN users ON orders."userId" = users.id
        WHERE "userId" = $1;
        `, [user.id]);

        const { rows: [games] } = await client.query(`
        SELECT *
        From cart
        JOIN games ON game.id = cart."gameId";
        `);

        return order;
    } catch (error) {
        console.error("Could not get orders");
        throw error;
    }
}

async function getOrderById(id) {
    try {
        const { rows: [order] } = await client.query(`
        SELECT *
        FROM orders
        WHERE id=$1;
        `, [id]);

        return order;
    } catch (error) {
        console.error("Could not get order by id");
        throw error;
    }
}

async function updateOrder({ id, status, cart }) {
    try {
        const order = await getOrderById(id);
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
        WHERE id=${id}
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
    getOrderById,
    updateOrder,
}