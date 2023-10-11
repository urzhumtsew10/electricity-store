import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./store/products";
import brandsReducer from "./store/brands";
import modalReducer from "./store/modals";
import errorReducer from "./store/errors";
import { api } from "./api";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = configureStore({
  reducer: {
    products: productsReducer,
    brands: brandsReducer,
    modals: modalReducer,
    errors: errorReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...[api.middleware]),
});

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
