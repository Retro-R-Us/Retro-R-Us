import BASEURL from "./index";
import React, { useEffect } from "react";

const MyOrders = ({ setMyOrderList, myOrderList }) => {
    useEffect(() => {
        const getMyOrders = () => {
            const id = window.localStorage.getItem('id').then((result) => {
                setMyOrderList(result)
            })
            .catch(console.error)
        }
        getMyOrders()
    }, [setMyOrderList]);

    return (
        <div className="myOrders">
            <label>My Orders</label>
            {myOrderList ? myOrderList.map((order) => {
                return (
                    <div>
                        <p>Order Number</p>{order.id}
                        <p>Order Status: {order.status}</p>
                        <p>Number of items ordered: {order.cart}</p>
                    </div>
                )
            })
        :
        <p>You have not placed any orders yet!</p>}
    </div>

  )

};

export default MyOrders;
