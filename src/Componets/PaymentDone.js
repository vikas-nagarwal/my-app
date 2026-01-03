import React from "react";

function paymentDone({ fullName, totalPrice, cart = [] }) {
  return (
    <>
      <style>{`
        .payment-wrapper {
          padding: 40px;
          background-color: #f8f9fa;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .payment-container {
          max-width: 600px;
          width: 100%;
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .payment-container h1 { color: #28a745; margin-bottom: 15px; }
        .payment-container p { margin: 8px 0; }
        .payment-container h3 { margin-top: 20px; color: #333; }
        .home-btn {
          padding: 12px 24px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 20px;
          transition: 0.3s;
        }
        .home-btn:hover { background-color: #218838; }
      `}</style>

      <div className="payment-wrapper">
        <div className="payment-container">
          <h1>✅ Payment Successful</h1>
          <p>
            Thank you, <strong>{fullName}</strong>
          </p>
          <p>Your order has been placed successfully.</p>

          <h3>Order Details:</h3>
          {cart.map((item) => (
            <p key={item.id}>
              {item.title} × {item.quantity} = ₹
              {(item.price * item.quantity).toFixed(2)}
            </p>
          ))}

          <h3>Total Paid: ₹{totalPrice}</h3>

          <button
            className="home-btn"
            onClick={() => (window.location.href = "/")}
          >
            Go to Home
          </button>
        </div>
      </div>
    </>
  );
}

export default paymentDone;
