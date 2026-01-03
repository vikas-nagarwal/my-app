import { useState } from "react";
import PaymentDone from "./PaymentDone";
import "./Payment.css";
import { useNavigate } from "react-router-dom";

function Payment({ cart = [], totalPrice = 0 }) {
  const [paymentDone, setPaymentDone] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.fullName.trim() &&
    formData.email.trim() &&
    formData.cardNumber.trim() &&
    formData.expiry.trim() &&
    formData.cvv.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Please fill all the fields correctly before proceeding.");
      return;
    }

    setPaymentDone(true);
  };

  if (paymentDone) {
    return (
      <PaymentDone
        fullName={formData.fullName}
        totalPrice={totalPrice}
        cart={cart}
      />
    );
  }
  return (
    <>
      <div className="payment-wrapper">
        <div className="payment-container">
          <div className="container text-center">
            <h1 className="text-white">Payment Details</h1>
            {/* <h3 className="text-white">Order Summary</h3> */}
            {/* {cart.map((item) => (
              // <p className="text-white" key={item.id}>
              //   {item.title} × {item.quantity} = ₹
              //   {(item.price * item.quantity).toFixed(2)}
              // </p>
            ))} */}
            {/* <h3 className="text-white">Total: ₹{totalPrice}</h3> */}

            <div className="payment-form">
              {/* <h2 className="text-white"></h2> */}
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
                <br></br>

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />

                <br></br>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  maxLength="19"
                />
                <br></br>

                <div className="form-row">
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    maxLength="5"
                  />
                  <br></br>

                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    maxLength="4"
                  />
                </div>
                <button type="submit" className="pay-btn">
                  Pay ₹{totalPrice}
                </button>
              </form>
              <button className="back-to-cart" onClick={() => navigate(-1)}>
                Back to Cart
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
