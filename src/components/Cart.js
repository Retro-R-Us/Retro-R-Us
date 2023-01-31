import BASEURL from "./index";
import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, setCart }) => {

  const handleIncrease = (item) => {
    return;
    // setCart((cart) =>
    //   cart.map((x) =>
    //     item.name === x.name ? { ...x, quantity: x.quantity + 1 } : x
    //   )
    // );
  };

  const handleDecrease = (item) => {
    return;
    // setCart((cart) =>
    //   cart.map((x) =>
    //     item.name === x.name
    //       ? { ...x, quantity: x.quantity - (x.quantity > 1 ? 1 : 0) }
    //       : x
    //   )
    // );
  };
  const removeFromCart = (itemtoRemove) => {
    return;
    // const newCart = cart.filter((item) => item !== itemtoRemove);
    // setCart(newCart);
  };

  const handleCheckout = () => {
    return;
    // setCart([]);
  };

  // const shoppingCart = ((a, c) => a + c.price * c.quantity, 0);
  
  const total = () => {
    let total = 0;
    cart.map((item) => {
      const price = Number(item.price)
      total += price;
    })
    return total;
  }

  return (
    <>
      <div className="Cart">
        <h1>My Cart</h1>
        {cart.map((item) => {
          return (
          <div className="cartItem" key={item.title}>
            <h3>{item.title}</h3>
            <button onClick={() => handleIncrease(item)}>+</button>
            <button onClick={() => handleDecrease(item)}>-</button>
            {/* <p>Qty: {item.quantity}</p> */}
            <p>${item.price} each</p>
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </div>
        )})}
        
        {cart.length === 0 ? <h3>Add something to your cart!</h3> : null}
        {cart.length !== 0 ? (
          <Link to={"/confirmation"}>
            <button onClick={handleCheckout}>Checkout</button>
          </Link>
        ) : null}
        <p>Total: ${total()}</p>
      </div>
    </>
  );
};

export default Cart;


