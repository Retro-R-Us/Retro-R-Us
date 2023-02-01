import e from "cors";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
    const [quantities, setQuantities] = useState([]);


    const handleCheckout = () => {
        return;
        // setCart([]);
    };
    
    const total = () => {
        let total = 0;
        cart.forEach((item) => {
            const price = Number(item.price);
            console.log("price:", price)
            total += price;
        });
        return total;
    };

    const removeItem = (item) => {
        const windowData = JSON.parse(window.localStorage.getItem("cart"));
        windowData.forEach((x, index) => {
            if (x.title === item.title) {
                const removedItem = windowData.splice(index, 1);
                window.localStorage.setItem("cart", JSON.stringify(windowData));
                setCart(windowData);
                return;
            }
        });
    };

    return (
        <div className="Cart">
            <h1>Cart</h1>
            {cart.length > 0 ? (
                <table className="ui celled padded table">
                    <thead>
                        <tr>
                            <th className="single line">Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Inc. Qty</th>
                            <th>Dec. Qty</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => {
                            item.quantity = 1;
                            return (
                                <tr key={index}>
                                    <td>
                                        <h4 className="ui center aligned">
                                            <Link style={{ color: "black" }} to="/">
                                                {item.title}
                                            </Link>
                                        </h4>
                                    </td>
                                    <td>
                                        <div className="ui center aligned">{item.quantity}</div>
                                    </td>
                                    <td className="right aligned">
                                        ${item.price}
                                        <br />
                                        <Link to="/">View Product</Link>
                                    </td>
                                    <td>
                                        <button
                                            className="circular ui icon button"
                                            onClick={() => {
                                                item.quantity + 1;
                                            }}>
                                            <i className="plus icon"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="circular ui icon button"
                                            onClick={() => {
                                                item.quantity - 1;
                                            }}>
                                            <i className="minus icon"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="circular ui icon button"
                                            onClick={() => {
                                                removeItem(item);
                                            }}>
                                            <i className="ban icon"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <div className="ui warning message">
                    <div className="header">Your Cart Is Empty.</div>
                    <p>Nothing to See Here.</p>
                </div>
            )}
            {cart.length > 0 ? (
                <>
                    <div
                        className="ui right floated compact message"
                        style={{ marginRight: "15px" }}>
                        <p>Subtotal (before tax): ${total()}</p>
                    </div>
                    <Link className="ui green animated fade button" to="/confirmation">
                        <div className="visible content">Checkout</div>
                        <div id="checkoutbutton" className="hidden content">
                            <i className="shopping cart icon"></i>
                            <i className="exchange alternate icon"></i>
                            <i className="dollar sign icon"></i>
                        </div>
                    </Link>
                </>
            ) : null}
        </div>
    );
};

export default Cart;


