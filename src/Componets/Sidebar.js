import React from "react";
import { useNavigate } from "react-router-dom";
// App.js ya Productapi.js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ required for offcanvas

function Sidebar({ categories, selectedCategory, setSelectedCategory }) {
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Button */}
      <button
        className="btn btn-primary d-md-none mb-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#mobileSidebar"
        aria-controls="mobileSidebar"
      >
        ☰ Categories
      </button>

      {/* Desktop Sidebar */}
      <div className="d-none d-md-block col-md-3">
        <div className="sidebar border p-3">
          <h4>Category</h4>
          <ul className="list-unstyled">
            {categories.map((cat, idx) => (
              <li
                key={idx}
                style={{
                  cursor: "pointer",
                  fontWeight: selectedCategory === cat ? "bold" : "normal",
                  color: selectedCategory === cat ? "blue" : "black",
                  marginBottom: "8px",
                }}
                onClick={() =>
                  setSelectedCategory(selectedCategory === cat ? "" : cat)
                }
              >
                {cat.toUpperCase()}
              </li>
            ))}
            <li
              style={{
                textAlign: "center",
                cursor: "pointer",
                padding: "10px",
                color: "green",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/add-product")}
            >
              Add Product
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Offcanvas Sidebar */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mobileSidebar"
        aria-labelledby="mobileSidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mobileSidebarLabel">
            Categories
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-unstyled">
            {categories.map((cat, idx) => (
              <li
                key={idx}
                style={{
                  cursor: "pointer",
                  fontWeight: selectedCategory === cat ? "bold" : "normal",
                  color: selectedCategory === cat ? "blue" : "black",
                  marginBottom: "8px",
                }}
                onClick={() => {
                  setSelectedCategory(selectedCategory === cat ? "" : cat);
                }}
                data-bs-dismiss="offcanvas"
              >
                {cat.toUpperCase()}
              </li>
            ))}
            <li
              style={{
                textAlign: "center",
                cursor: "pointer",
                padding: "10px",
                color: "green",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/add-product")}
            >
              Add Product
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
