import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer className="bg-dark text-light mt-5 pt-4">
      <div className="container">
        <div className="row">
          {/* Column 1 */}
          <div className="col-6 col-md-3 mb-3">
            <h6>About Us</h6>
            <p className="small">
              We provide quality products with secure payments and fast
              delivery.
            </p>
          </div>

          {/* Column 2 */}
          <div className="col-6 col-md-3 mb-3">
            <h6>Quick Links</h6>
            <ul className="list-unstyled small">
              <li>Home</li>
              <li>Products</li>
              <li>Recipes</li>
              <li>Payment</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-6 col-md-3 mb-3">
            <h6>Support</h6>
            <ul className="list-unstyled small">
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="col-6 col-md-3 mb-3">
            <h6>Contact</h6>
            <p className="small mb-1">Email: support@example.com</p>
            <p className="small">Phone: +91 98765 43210</p>
          </div>
        </div>

        <hr className="border-secondary" />

        <div className="text-center small pb-3">
          © {new Date().getFullYear()} MyShop. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
