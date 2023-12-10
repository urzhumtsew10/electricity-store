import "../App/App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Cart } from "../Cart/Cart";
import { Main } from "../Main/Main";
import { Authorization } from "../Modals/Authorization/Authorization";
import { Elected } from "../Elected/Elected";
import { ProductPage } from "../ProductPage/ProductPage";
import { ErrorModal } from "../Modals/ErrorModal/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import { CategoryPage } from "../CategoryPage/CategoryPage";
import { OrderForm } from "../OrderForm/OrderForm";
import { CategoriesMobile } from "../CategoriesMobile/CategoriesMobile";
import { Catalog } from "../Catalog/Catalog";
import { LoadingModal } from "../Modals/LoadingModal/LoadingModal";
import { useEffect } from "react";
import { setIsLoading } from "../../store/modals";

function App() {
  const dispatch = useDispatch();
  const errorModal = useSelector((state) => state.modals.errorModal);
  const isActiveOrderForm = useSelector((state) => state.modals.orderForm);
  const isLoading = useSelector((state) => state.modals.isLoading);

  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    if (products.length || categories.length) {
      dispatch(setIsLoading({ value: false }));
    } else {
      dispatch(setIsLoading({ value: true }));
    }
  }, [products, categories]);

  const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
  if (!cartProducts) {
    localStorage.setItem("cartProducts", JSON.stringify([]));
  }

  return (
    <div className="online-store">
      {errorModal.isActive && <ErrorModal />}
      {isActiveOrderForm && <OrderForm />}
      {isLoading && <LoadingModal />}
      <Header />
      <Authorization />
      <div className="contentPage">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/elected" element={<Elected />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/categories-mobile" element={<CategoriesMobile />} />
          <Route path="/catalog-mobile" element={<Catalog />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
