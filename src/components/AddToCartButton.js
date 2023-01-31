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
        <div className="ui animated fade button" tabIndex="0" onClick={handleAddToCart}>
            <div className="visible content">Add To Cart</div>
            <div className="hidden content">
                <i className="cart plus icon" style={{backgroundImage: "none"}}></i>
            </div>
        </div>
    );
}

export default AddToCartButton;

