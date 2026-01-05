import React, { useEffect, useState, useContext, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import "jquery-ui/ui/widgets/sortable";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { LanguageContext } from "./LanguageContext";

function Productapi() {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const { lang, changeLanguage, translations } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]); // Original fetched data
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [displayProducts, setDisplayProducts] = useState([]);

  const gridRef = useRef(null);

  // Reset page when filter/search/lang changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, lang]);

  // Fetch products
  useEffect(() => {
    const url = lang === "en" ? "/products.json" : "/producthindi.json";

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const products = json?.products || [];

        // Category count
        const categoryCount = {};
        products.forEach((item) => {
          categoryCount[item.category] =
            (categoryCount[item.category] || 0) + 1;
        });

        // Category array with count
        const categoryArray = [
          { name: "all", count: products.length },
          ...Object.keys(categoryCount).map((cat) => ({
            name: cat,
            count: categoryCount[cat],
          })),
        ];

        setData(products);
        setDisplayProducts(products);
        setCategories(categoryArray);
      })
      .catch((err) => console.error(err));
  }, [lang]);

  // Filter products
  const filteredData = displayProducts.filter((item) => {
    const title = item.title || ""; // default empty string
    const brand = item.brand || ""; // default empty string

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // jQuery sortable
  useEffect(() => {
    if (gridRef.current) {
      $(gridRef.current).sortable({
        items: ".product-card",
        update: function () {
          const newOrder = [];
          $(gridRef.current)
            .children(".product-card")
            .each(function () {
              const id = Number(
                $(this).getAttribute("data-id") || $(this).attr("data-id")
              );
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
      <div className="container my-4">
        {/* Header */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-4">
            <h1>{translations[lang].title}</h1>
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
              className="form-control"
              placeholder={translations[lang].search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Main Layout */}
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
            <div ref={gridRef} className="row g-3">
              {paginatedProducts.length ? (
                paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    data-id={product.id}
                    className="product-card col-lg-3 col-md-4 col-sm-6"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="card h-100">
                      <img src={product.thumbnail} className="card-img-top" />
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

      {/* Pagination */}
      <div className="d-flex justify-content-center my-4">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </button>
          </li>

          {[...Array(totalPages)].map((_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Productapi;
