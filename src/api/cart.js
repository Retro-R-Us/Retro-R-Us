import BASEURL from "./index";

export const addItemToCart = async (orderId, quantity, userId) => {
    try {
        const response = await fetch(`${BASEURL}/cart`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                 orderId: orderId,
                 quantity: quantity,
                 userId: userId,
            }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const updateCart = async (cartId) => {
    try {
        const response = await fetch(`${BASEURL}/cart/${cartId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                quantity: quantity,
                gameId: gameId,
                consoleId: consoleId,
                accessoryId: accessoryId,
                collectibleId: collectibleId,
            }),
        });

        const data = await response.json();
        return data;
    } catch {
        console.error(error);
    }
};

export const getOrderById = async (cartId) => {
    try {
        const response = await fetch(`${BASEURL}/cart/${userId}`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cartId: cartId,
                orderId: orderId,
            }),
        });

        const data = await response.json();
        return data;
    } catch {
        console.error(error);
    }
}

export const destroyCart = async (cartId) => {
    try {
        const response = await fetch(`${BASEURL}/cart/${cartId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
    }});

        const data = await response.json();
        return data;
    } catch {
        console.error(error);
    }
}