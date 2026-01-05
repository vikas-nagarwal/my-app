import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // required for offcanvas

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
                  fontWeight: selectedCategory === cat.name ? "bold" : "normal",
                  color: selectedCategory === cat.name ? "blue" : "black",
                  marginBottom: "8px",
                }}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === cat.name ? "" : cat.name
                  )
                }
              >
                {cat.name.toUpperCase()} ({cat.count})
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
                  fontWeight: selectedCategory === cat.name ? "bold" : "normal",
                  color: selectedCategory === cat.name ? "blue" : "black",
                  marginBottom: "8px",
                }}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === cat.name ? "" : cat.name
                  )
                }
                data-bs-dismiss="offcanvas"
              >
                {cat.name.toUpperCase()} ({cat.count})
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
