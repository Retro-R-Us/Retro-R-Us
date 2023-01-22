import BASEURL from "./index";

export const getAllOrders = async () => {
    try {
        const response = await fetch(`${BASEURL}/order`, {
            headers: {
            "Content-Type": "application/json"
      }});
    
        const result = await response.json();
        return result;
    } catch {
        console.error(error);
    }
};

export const createOrder = async (orderId) => {
   try {
    const response = await fetch(`${BASEURL}/order`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
    },
        body: JSON.stringify({
        orderId: orderId,
        cart: cart,
    }),
    }); 
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error)
    }
};

export const updateOrder = async (id, status, cart) => {
    try {
        const response = await fetch(`${BASEURL}/order/${orderId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
        },
            body: JSON.stringify({
                orderId: orderId,
                status: status,
                cart: cart,
        }),
    });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error)
    }
};

export const getOrderById = async (userId) => {
    try{
        const response = await fetch(`${BASEURL}/order/${userId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error)
    }
};
