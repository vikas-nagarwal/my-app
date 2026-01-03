import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

function AddProduct() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      title,
      image,
      price,
      brand,
      category,
    };

    console.log("Product Added:", product);
    alert("Product Added Successfully ✅");

    // Clear form
    setTitle("");
    setImage("");
    setPrice("");
    setBrand("");
    setCategory("");
  };

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* LEFT CONTENT */}
        <div className="col-md-6 mb-4 mb-md-0">
          <p className="text-muted">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. It has survived not only five centuries, but also the leap
            into electronic typesetting, remaining essentially unchanged.
          </p>
        </div>

        {/* FORM CARD */}
        <div className="col-md-6 col-lg-5 mx-auto">
          <div className="card shadow-lg border-0 rounded-4 p-4">
            {/* Back Button */}
            <button
              className="btn btn-outline-secondary btn-sm mb-3"
              onClick={() => navigate("/")}
            >
              ← Back
            </button>

            <h4 className="text-center fw-bold mb-4">Add New Product</h4>
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-6">
                <label className="form-label fw-semibold">Product Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter product title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Image */}
              <div className="mb-12">
                <label className="form-label fw-semibold">Image URL</label>
                <input type="file" name="docfile" className="form-control" />
              </div>

              {/* Price */}
              <div className="mb-6">
                <label className="form-label fw-semibold">Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              {/* Brand */}
              <div className="mb-6">
                <label className="form-label fw-semibold">Brand</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Brand name"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Choose Category
                </label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  <option value="grocery">Grocery</option>
                  <option value="beauty">Beauty</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100 fw-semibold"
              >
                ➕ Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddProduct;
