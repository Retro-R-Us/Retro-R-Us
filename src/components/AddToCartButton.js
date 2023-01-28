import React from "react";
import { addItemToCart } from "../api/cart";

const AddToCartButton = ({ data, userData }) => {
    const handleAddToCart = async () => {
        const orderId = data.id;
        const quantity = 1;
        const userId = userData.id;
        await addItemToCart(orderId, quantity, userId);
        console.log("added to cart! :D");
    }

    return (
        <button 
            className="addToCartButton" 
            onClick={handleAddToCart}>Add to Cart</button>
    );
}

export default AddToCartButton;