import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { LanguageContext } from "./LanguageContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Productapi() {
  const { lang, changeLanguage, translations } = useContext(LanguageContext);
  const navigate = useNavigate();

  // States
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [displayProducts, setDisplayProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    const url = lang === "en" ? "/products.json" : "/producthindi.json";
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const products = json?.products || [];
        setData(products);
        setCategories(["all", ...new Set(products.map((p) => p.category))]);
        setDisplayProducts(products);
      })
      .catch((err) => console.error(err));
  }, [lang]);

  // Filter products for display
  const filteredDisplayProducts = displayProducts.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Drag & Drop handler
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(displayProducts);
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // Swap items
    const [removed] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, removed);

    setDisplayProducts(items);
  };

  return (
    <div className="container my-4">
      {/* HEADER */}
      <div className="row align-items-center mb-4">
        <div className="col-md-3">
          <h1>{translations[lang].title}</h1>
        </div>

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

        {/* Products Grid */}
        <div className="col-md-9">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="products" direction="vertical">
              {(provided) => (
                <div
                  className="d-flex flex-wrap"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    gap: "1rem",
                    minHeight: "200px",
                    padding: "0.5rem",
                  }}
                >
                  {filteredDisplayProducts.length > 0 ? (
                    filteredDisplayProducts.map((product, index) => (
                      <Draggable
                        key={product.id}
                        draggableId={product.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            className="product-card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              width: "23%",
                              cursor: "grab",
                              transition: "all 0.2s ease",
                              boxShadow: snapshot.isDragging
                                ? "0 4px 12px rgba(0,0,0,0.2)"
                                : "0 1px 4px rgba(0,0,0,0.1)",
                              ...provided.draggableProps.style,
                            }}
                          >
                            <div
                              className="card h-100"
                              onClick={() => navigate(`/product/${product.id}`)}
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
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <h5 className="text-center">
                      {translations[lang].noProduct}
                    </h5>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default Productapi;
