
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
    const [quantities, setQuantities] = useState([]);

    const handleCheckout = () => {
        return;
        // setCart([]);
    };

    // const shoppingCart = ((a, c) => a + c.price * c.quantity, 0);

    const total = () => {
        let total = 0;
        cart.map((item) => {
            item.price = Number(item.price)
            const price = item.price;
            total += price;
        });
        return total;
    };

    const removeItem = (item) => {
        const windowData = JSON.parse(window.localStorage.getItem("cart"));
        windowData.every((x, index) => {
            if (x.title === item.title) {
                const removedItem = windowData.splice(index, index + 1);
                window.localStorage.setItem("cart", JSON.stringify(windowData));
                setCart(windowData);
                return;
            }
        });
    };

    return (
        <div className="cart">
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
                <div className="header">
                  Your Cart Is Empty.
                </div>
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
                    <Link className="ui animated fade button" to="/checkout">
                        <div className="visible content">Checkout</div>
                        <div className="hidden content">
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

{
    /* <tr>
    <td>
        <h2 className="ui center aligned header">A</h2>
    </td>
    <td className="single line">Power Output</td>
    <td>
        <div className="ui star rating" data-rating="3" data-max-rating="3"></div>
    </td>
    <td className="right aligned">
        80%
        <br />
        <a href="#">18 studies</a>
    </td>
</tr>; */
}
