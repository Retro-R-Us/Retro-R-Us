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
        const response = await fetch(`${BASEURL}/cart/:cartId`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cartId: cartId
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
        const response = await fetch(`${BASEURL}/cart/userId`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cartId: cartId
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
        const response = await fetch(`${BASEURL}/cart/:cartId`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cartId: cartId
            }),
        });

        const data = await response.json();
        return data;
    } catch {
        console.error(error);
    }
}