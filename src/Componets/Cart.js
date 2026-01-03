import React, { useEffect, useState } from "react";
import { useCart } from "./Cartcontext";
import Payment from "./payment";

function Cart() {
  const { cart, addToCart, decreaseQuantity, removeFromCart } = useCart();
  const [showPayment, setShowPayment] = useState(false);

  const totalPrice = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  // Browser Back handle
  useEffect(() => {
    const handleBack = () => {
      setShowPayment(false);
    };

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, []);

  return (
    <>
      <style>{`
        .cart-container {
          max-width: 900px;
          margin: 20px auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .cart-header {
          font-size: 28px;
          margin-bottom: 20px;
          color: #333;
          border-bottom: 2px solid #007bff;
          padding-bottom: 10px;
        }
        .cart-empty {
          text-align: center;
          color: #999;
          font-size: 16px;
          padding: 40px;
        }
        .cart-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 15px;
          margin-bottom: 10px;
          border-radius: 6px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        .item-info {
          flex: 1;
        }
        .item-title {
          margin: 0 0 5px 0;
          color: #333;
        }
        .item-price {
          margin: 0;
          color: #666;
          font-size: 14px;
        }
        .quantity-control {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 15px;
        }
        .qty-btn {
          width: 30px;
          height: 30px;
          border: 1px solid #ddd;
          background: white;
          cursor: pointer;
          border-radius: 4px;
        }
        .delete-btn {
          padding: 6px 12px;
          background-color: #dc3545;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .total-section {
          background: white;
          padding: 20px;
          margin-top: 20px;
          border-radius: 6px;
          text-align: right;
        }
        .total-price {
          margin: 0;
          color: #007bff;
          font-size: 22px;
        }
        .checkout-btn {
          padding: 12px 30px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 15px;
        }
        .checkout-btn:hover {
          background-color: #218838;
        }
        @media (max-width: 768px) {
          .cart-container {
            padding: 10px;
          }
          .checkout-btn {
            width: 100%;
          }
        }
      `}</style>

      {!showPayment ? (
        <div className="cart-container">
          <h2 className="cart-header">My Cart</h2>
          {cart.length === 0 && <p className="cart-empty">Cart empty</p>}
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <h5 className="item-title">{item.title}</h5>
                <p className="item-price">
                  ${item.price} x {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="quantity-control">
                <button
                  className="qty-btn"
                  onClick={() => decreaseQuantity(item)}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button className="qty-btn" onClick={() => addToCart(item)}>
                  +
                </button>
              </div>
              <button
                className="delete-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Delete
              </button>
            </div>
          ))}
          {cart.length > 0 && (
            <div className="total-section">
              <h3 className="total-price">Total Price: ${totalPrice}</h3>
            </div>
          )}
          {cart.length > 0 && (
            <button
              className="checkout-btn float-end"
              onClick={() => {
                if (cart.length > 0) {
                  setShowPayment(true); // show payment screen
                  window.history.pushState({ page: "payment" }, ""); // browser back support
                } else {
                  alert("Please add at least one product to proceed checkout");
                }
              }}
            >
              Proceed to Checkout
            </button>
          )}
        </div>
      ) : (
        <Payment cart={cart} totalPrice={totalPrice} />
      )}
    </>
  );
}

export default Cart;
