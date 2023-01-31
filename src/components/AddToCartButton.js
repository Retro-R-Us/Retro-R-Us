import React from "react";
import { addItemToCart } from "../api/cart";

const AddToCartButton = ({setCartItem, data, userData }) => {

    const handleAddToCart = async () => {
        if (userData === undefined ) {
            setCartItem(data);
        } else {
            const userId = userData.id;
            const orderId = 1;
            const quantity = 1;
            const cart = await addItemToCart(orderId, quantity, userId);
        }
        
    }
    return (
        <button 
            className="addToCartButton" 
            onClick={handleAddToCart}>Add to Cart</button>
    );
}

export default AddToCartButton;