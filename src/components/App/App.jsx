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
import { useSelector } from "react-redux";
import { CategoryPage } from "../CategoryPage/CategoryPage";

function App() {
  const errorModal = useSelector((state) => state.modals.errorModal);
  return (
    <div className="online-store">
      {errorModal.isActive && <ErrorModal />}
      <Header />
      <Authorization />
      <div className="contentPage">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/elected" element={<Elected />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
