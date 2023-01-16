const client = require("../client");

async function addItemToCart({ orderId, quantity, userId }) {
    try {
        const { rows: [newOrder] } = await client.query(`
        INSERT INTO cart("orderId", quantity, "userId")
        VALUES ($1, $2, $3)
        RETURNING *;
        `, [orderId, quantity, userId]);

        return newOrder;
    } catch (error) {
        console.error("Could not add item to order");
        throw error;
    }
}

async function getOrderById(id) {
    try {
        const { rows: [cart] } = await client.query(`
        SELECT *
        FROM cart
        WHERE id=$1;
        `, [id]);

        return cart;
    } catch (error) {
        console.error("Could not get order by id");
        throw error;
    }
}

async function updateCart({ id, ...fields }) {
    try {
        const order = await getOrderById(id);
        if (!order) {
            return;
        }
        const setString = Object.keys(fields).map((key, index) => `"${key}"=${index + 1}`)
        .join(", ");

        if (setString.length === 0) {
            return;
        }
        const { rows: [updateCart] } = await client.query(`
        UPDATE cart
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `, Object.values(fields));

        return updateCart;
    } catch (error) {
        console.error("Could not update cart");
        throw error;
    }
}

async function destroyCart(id) {
    try {
        const { rows: [deleteCart] } = await client.query(`
        DELETE
        FROM cart
        WHERE id=$1
        RETURNING *;
        `, [id]);

        return deleteCart;
    } catch (error) {
        console.error("Could not delete cart");
        throw error;
    }
}


module.exports = {
    addItemToCart,
    getOrderById,
    updateCart,
    destroyCart,
}
