import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { LanguageContext } from "./LanguageContext";

function Productapi() {
  const { lang, changeLanguage, translations } = useContext(LanguageContext);

  // 🔹 States
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();
  var url = "";
  // 🔹 Fetch Products
  useEffect(() => {
    if (lang == "en") {
      url = "/products.json";
    } else {
      url = "/producthindi.json";
    }
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const products = json?.products || [];
        setData(products);
        setCategories([...new Set(products.map((p) => p.category))]);
      })
      .catch((err) => console.error(err));
  }, [lang]);

  // 🔹 Filter Products
  const filteredData = data.filter((item) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      item.title?.toLowerCase().includes(search) ||
      item.brand?.toLowerCase().includes(search);

    const matchesCategory = selectedCategory
      ? item.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container my-4">
      {/* HEADER */}
      <div className="row align-items-center mb-4">
        <div className="col-md-3">
          <h1>{translations[lang].title}</h1>
        </div>

        {/* Language Switch */}
        <div className="col-md-3">
          <select
            className="form-select"
            value={lang}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        {/* Search */}
        <div className="col-md-6">
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
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Products */}
        <div className="col-md-9">
          <div className="row g-3">
            {filteredData.length > 0 ? (
              filteredData.map((product) => (
                <div key={product.id} className="col-md-3">
                  <div
                    className="card h-100"
                    onClick={() => navigate(`/product/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  >
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
  );
}

export default Productapi;
