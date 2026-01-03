import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Singin from "./Componets/Singin";
import Productapi from "./Componets/Productapi";
import ProductDetail from "./Componets/ProductDetail";
import Cart from "./Componets/Cart";
import Payment from "./Componets/payment";
import AddProduct from "./Componets/Addproduct";
import { LanguageProvider } from "./Componets/LanguageContext";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <LanguageProvider>
      {" "}
      {/* 🔥🔥🔥 MUST */}
      <Routes>
        <Route path="/" element={<Singin />} />

        <Route
          path="/productapi"
          element={
            <ProtectedRoute>
              <Productapi />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addproduct"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
