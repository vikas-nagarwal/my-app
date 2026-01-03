import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Signin() {
  // Username state
  const [text, settext] = useState("kminchelle"); // valid dummyjson username

  // Password state
  const [password, setPassword] = useState("0lelplR"); // valid dummyjson password

  // Result message
  const [result, setResult] = useState("");

  // Success flag
  const [success, setSuccess] = useState(false);

  // Login function
  const handleLogin = () => {
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: text,
        password: password,
        expiresInMins: 30,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("API RESPONSE:", data);

        if (data.accessToken) {
          setSuccess(true);
          setResult("Login Successful");

          // Store token for auth
          localStorage.setItem("token", data.accessToken);

          // Redirect to Product page
          window.location.href = "/Productapi";
        } else {
          setSuccess(false);
          setResult("Login Failed");
        }
      })
      .catch((e) => {
        console.error(e);
        setSuccess(false);
        setResult("Something went wrong");
      });
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-sm" style={{ width: "350px" }}>
        <div className="card-body">
          <h4 className="text-center fw-bold mb-3">Product.com</h4>

          <label>User Name</label>
          <input
            type="text"
            className="form-control mb-3"
            value={text}
            onChange={(e) => settext(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn btn-warning w-100 fw-semibold"
            onClick={handleLogin}
          >
            Continue
          </button>

          {result && (
            <p
              className={`text-center fw-bold mt-3 ${
                success ? "text-success" : "text-danger"
              }`}
            >
              {result}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signin;
