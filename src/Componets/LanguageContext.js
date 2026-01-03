import React, { createContext, useState } from "react";
export const LanguageContext = createContext();

const translations = {
  en: {
    title: "Product List",
    search: "Search product...",
    noProduct: "No product found",
    cart: "Cart",
    payment: "Payment",
    login: "Login",
  },
  hi: {
    title: "उत्पाद सूची",
    search: "उत्पाद खोजें...",
    noProduct: "कोई उत्पाद नहीं मिला",
    cart: "कार्ट",
    payment: "भुगतान",
    login: "लॉगिन",
  },
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  const changeLanguage = (lng) => {
    setLang(lng);
    localStorage.setItem("lang", lng); // 🔥 important
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};
