import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "../Componets/Cartcontext";
import "../App.css";
import Catsapiproduct from "./Catsapiproduct";
// import Productapi from "./Productapi";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data.thumbnail);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <h3>Loading product...</h3>
      </div>
    );

  if (!product)
    return (
      <div className="text-center mt-5">
        <h3>Product not found</h3>
      </div>
    );

  return (
    <>
      <div className="container my-5">
        <button
          className="btn btn-outline-secondary mb-4"
          onClick={() => navigate(-1)}
        >
          ⬅ Back
        </button>

        <div className="row g-4">
          {/* Images */}
          <div className="col-12 col-lg-6">
            <div className="border p-3 rounded shadow-sm">
              <img
                src={mainImage}
                alt={product.title}
                className="product-main-img mb-3"
                loading="lazy"
              />
              <div className="d-flex gap-2 flex-wrap">
                {product.images?.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`img-${idx}`}
                    className="product-thumbnail border"
                    style={{
                      border:
                        mainImage === img
                          ? "2px solid #ffc107"
                          : "1px solid #ccc",
                    }}
                    onClick={() => setMainImage(img)}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="col-12 col-lg-6">
            <h2 className="fw-bold">{product.title}</h2>
            <p className="text-muted">
              {product.brand} | {product.category}
            </p>

            <div className="d-flex align-items-center gap-3 flex-wrap mb-2">
              <span className="product-price text-danger">
                ${product.price}
              </span>
              <span className="badge bg-success product-badge">
                {product.discountPercentage}% OFF
              </span>
            </div>

            <div className="product-rating mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  style={{
                    color: i < Math.round(product.rating) ? "#FFD700" : "#ccc",
                  }}
                >
                  ★
                </span>
              ))}
              <span className="ms-2">({product.rating})</span>
            </div>

            {product.stock && (
              <p>
                <b>Stock:</b> {product.stock}
              </p>
            )}
            {product.availabilityStatus && (
              <p>
                <b>Availability:</b> {product.availabilityStatus}
              </p>
            )}
            {product.warrantyInformation && (
              <p>
                <b>Warranty:</b> {product.warrantyInformation}
              </p>
            )}
            {product.shippingInformation && (
              <p>
                <b>Shipping:</b> {product.shippingInformation}
              </p>
            )}
            {product.returnPolicy && (
              <p>
                <b>Return Policy:</b> {product.returnPolicy}
              </p>
            )}

            {product.tags?.length > 0 && (
              <div className="product-tags mb-3">
                {product.tags.map((tag, idx) => (
                  <span key={idx} className="badge bg-secondary me-1">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <button
              className="btn btn-warning btn-add-cart"
              onClick={() => {
                addToCart(product);
                navigate("/cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Description + Details + Reviews */}
        <div className="row mt-5 g-4">
          {/* Description & Details */}
          <div className="col-12 col-md-6 product-details">
            <h4>Description</h4>
            <p>{product.description}</p>

            <h5>Product Details</h5>
            <p>
              <b>SKU:</b> {product.sku}
            </p>
            <p>
              <b>Weight:</b> {product.weight} g
            </p>
            <p>
              <b>Dimensions:</b> {product.dimensions?.width} x{" "}
              {product.dimensions?.height} x {product.dimensions?.depth} cm
            </p>
            <p>
              <b>Barcode:</b> {product.meta?.barcode}
            </p>
          </div>

          {/* Reviews */}
          <div className="col-12 col-md-6">
            <h4>Customer Reviews ({product.reviews?.length || 0})</h4>
            {product.reviews?.map((review, idx) => (
              <div key={idx} className="review-card">
                <p className="mb-1">
                  <b>{review.reviewerName}</b> ({review.rating} ⭐)
                </p>
                <p className="mb-0">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Catsapiproduct />
    </>
  );
}

export default ProductDetail;
