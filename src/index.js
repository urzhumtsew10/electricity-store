import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./store/products";
import brandsReducer from "./store/brands";
import modalReducer from "./store/modals";
import formRegisterReducer from "./store/form";
import menuAccountReducer from "./store/menuAccount";
import cartReducer from "./store/cart";
import electedProductReducer from "./store/elected";
import catalogReducer from "./store/catalog";
import categoryReducer from "./store/categories";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = configureStore({
  reducer: {
    products: productsReducer,
    brands: brandsReducer,
    categories: categoryReducer,
    catalog: catalogReducer,
    modals: modalReducer,
    formRegister: formRegisterReducer,
    menuAccount: menuAccountReducer,
    electedProducts: electedProductReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

root.render(
  <BrowserRouter>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  </BrowserRouter>
);

reportWebVitals();
