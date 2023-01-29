import React from "react";
import { addItemToCart } from "../api/cart";

const AddToCartButton = ({ data, userData }) => {
    const handleAddToCart = async () => {
        const orderId = 1;
        const quantity = 1;
        const userId = userData.id;
        console.log(userData);
        console.log(data);
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