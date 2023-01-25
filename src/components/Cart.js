import BASEURL from './index';
import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ loggedIn, cart, setCart }) => {
    const handleIncrease = (item) => {
        setCart((cart) =>
        cart.map((x) =>
        item.name === x.name ? { ...x, quantity: x.quantity + 1 } : x
        )
      );
    };

    const handleDecrease = (item) => {
        setCart((cart) =>
        cart.map((x) => 
        item.name === x.name ? { ...x, quantity: x.quantity - (x.quantity > 1 ? 1 : 0) } : x
        )
      );
    };
        const removeFromCart = (itemtoRemove) => {
            const newCart = cart.filter((item) => item !== itemtoRemove);
            setCart(newCart);
        };

    const handleCheckout = () => {

    setCart([]);
};

const shoppingCart = cart.reduce((a, c) =>  a + c.price * c.quantity, 0);
return (
    <>
    <div className="Cart">
        <h1>My Cart</h1>
        {cart.map((item) =>
            <div className="cartItem" key={item.name}>
                <img
                    className="cartImage"
                    alt={item.image}
                    //insert image file source here src={}
                />
                <h3>{item.name}</h3>
                <button onClick={() => handleIncrease(item)}>+</button>
                <button onClick={() => handleDecrease(item)}>-</button>
                <p>Qty: {item.quantity}</p>
                <p>${item.price} each</p>
                <p>Total: ${item.quantity * item.price}</p>
                <button onClick={() => removeFromCart(item)}>Remove</button>
            </div>
        )};
        {cart.length !== 0 && (
            <div>
                <h3>Total (includes shipping, processing, and tax): ${shoppingCart}</h3>
            </div>
        )}
        {cart.length === 0 ? <p>Add something to your cart!</p> : null}

        {!loggedIn && cart.length !== 0 ? (
        <h3>
          Please{" "}
          <Link to={"/login"}>
            <button>login</button>
          </Link>{" "}
        
          or{" "}
        
          <Link to={"/register"}>
            <button>create an account</button>
          </Link>{" "}
        
          to complete checkout.
        </h3>
      ) : cart.length !== 0 ? (
        <Link to={"/checkout"}>
          <button onClick={() => handleCheckout()}>Checkout</button>
        </Link>
      ) : null}
    </div>
    </>
  );
};

export default Cart;