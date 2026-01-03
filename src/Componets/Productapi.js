import React, { useEffect, useState, useContext, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import "jquery-ui/ui/widgets/sortable";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { LanguageContext } from "./LanguageContext";

function Productapi() {
  const { lang, changeLanguage, translations } = useContext(LanguageContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]); // Original data
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [displayProducts, setDisplayProducts] = useState([]); // Products for UI + sorting

  const gridRef = useRef(null);

  // Fetch products
  useEffect(() => {
    const url = lang === "en" ? "/products.json" : "/producthindi.json";

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const products = json?.products || [];
        setData(products);
        setCategories(["all", ...new Set(products.map((p) => p.category))]);
        setDisplayProducts(products); // initialize
      })
      .catch((err) => console.error(err));
  }, [lang]);

  // Filter products for search + category
  const filteredData = displayProducts.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Initialize jQuery sortable
  useEffect(() => {
    if (gridRef.current) {
      $(gridRef.current).sortable({
        items: ".product-card",
        placeholder: "ui-state-highlight",
        cursor: "grab",
        tolerance: "pointer",
        forcePlaceholderSize: true,
        helper: "clone",
        update: function (event, ui) {
          // Update React state after drag
          const newOrder = [];
          $(gridRef.current)
            .children(".product-card")
            .each(function () {
              const id = parseInt($(this).attr("data-id"));
              const product = displayProducts.find((p) => p.id === id);
              if (product) newOrder.push(product);
            });
          setDisplayProducts(newOrder);
        },
      });
    }
  }, [displayProducts]);

  return (
    <>
      {" "}
      <div className="container my-4">
        {/* HEADER */}
        <div className="row align-items-center mb-4">
          <div className="col-md-4">
            <h1>
              {translations[lang].title
                .toUpperCase()
                .split("") // split every character
                .map((char) => (char === " " ? "  " : char)) // double space for original spaces
                .join(" ")}
            </h1>
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={lang}
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
            </select>
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder={translations[lang].search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <Sidebar
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          {/* Product Grid */}
          <div className="col-md-9">
            <div
              ref={gridRef}
              className="row g-3" // use row for Bootstrap grid
            >
              {filteredData.length > 0 ? (
                filteredData.map((product) => (
                  <div
                    key={product.id}
                    className="product-card col-lg-3 col-md-4 col-sm-6"
                    data-id={product.id}
                    style={{ cursor: "grab" }}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="card h-100">
                      <img
                        src={product.thumbnail}
                        className="card-img-top"
                        alt={product.title}
                      />
                      <div className="card-body">
                        <h6>{product.title}</h6>
                        <p className="text-danger">${product.price}</p>
                        <small>{product.brand}</small>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h5 className="text-center">{translations[lang].noProduct}</h5>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="pagination my-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-auto">
              <h1>vikas</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Productapi;
