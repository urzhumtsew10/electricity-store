import "../App/App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Cart } from "../Cart/Cart";
import { Main } from "../Main/Main";
import { Authorization } from "../Modals/Authorization/Authorization";
import { Elected } from "../Elected/Elected";
function App() {
  return (
    <div className="online-store">
      <Header />
      <Authorization />
      <div className="contentPage">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/elected" element={<Elected />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
