import React from 'react';

const orderConfirmation = () => {
    document.addEventListener('DOMContentLoaded', async () => {
        let urlParams = new URLSearchParams(window.location.search);
        let sessionId = urlParams.get('session-id');

        if (sessionId) {
            const session = await fetch(`order-info/${sessionId}`).then((response) => response.json());

            setText("customer-name", session.customer.name);
            setText("customer-email", session.customer.email);
            setText("payment-status", `Payment Status: ${session.payment_status}`);

            let currencyFormat = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: `${session.currency}`,
            });

            setText("order-total", `Order Total: ${currencyFormat.format(session.amount_total / 100)}`);
        }
    });

const setText = (elementId, text) => {
    const element = document.querySelector(`#${elementId}`);
    element.innerHTML = text;

const givenSet = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789";

let code = "";
for (let i=0; i<5; i++) {
    let pos = Math.floor(Math.random()*givenSet.length);
    code += givenSet[pos]

    return code;
}
}

    return (
    <div className="order-info">
        <h1>Order Confirmed!</h1>
            <ul>
                <li>Confirmation Number:<span className="order"></span></li>
                <li>Name:<span className="customer-name"></span></li>
                <li>Email:<span className="customer-email"></span></li>
                <li><span className="order-total"></span></li>
                <li><span className="payment-status"></span></li>
            </ul>
        
        <p>We appreciate your business!</p>
    </div>
    )
}

export default orderConfirmation;