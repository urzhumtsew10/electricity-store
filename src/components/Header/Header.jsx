import logo from "../../img/logo.svg";
import cart from "../../img/icon-cart.svg";
import heart from "../../img/icon-heart.svg";
import search from "../../img/icon-search.svg";
import menu from "../../img/icon-menu.svg";
import "../Header/Header.css";
import { useDispatch } from "react-redux";
import { setActiveAuthModal } from "../../store/modals";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openElectedPage = () => {
    navigate("/elected");
  };

  const openHomePage = () => {
    navigate("/");
  };

  const openCartPage = () => {
    navigate("/cart");
  };

  const openAuthModal = () => {
    dispatch(setActiveAuthModal({ isActive: true }));
  };

  return (
    <header className="header">
      <img
        onClick={openHomePage}
        className="header__logo"
        src={logo}
        alt="log"
      />
      <div className="header__catalog">
        <img className="catalog__img header-icon" src={menu} alt="menu" />
        <p className="catalog__text">CATALOG</p>
      </div>
      <div className="header__searchDiv">
        <input
          className="searchDiv__input"
          type="text"
          placeholder="search product"
        />
        <div className="searchDiv__buttonSearch">
          <img
            className="buttonSearch__img header-icon"
            src={search}
            alt="search"
          />
        </div>
      </div>
      <div onClick={openElectedPage} className="header__electedBtn header-btn">
        <img className="electedBtn__img header-icon" src={heart} alt="heart" />
      </div>
      <div onClick={openCartPage} className="header__cartBtn header-btn">
        <img className="cartBtn__img header-icon" src={cart} alt="cart" />
      </div>
      <button onClick={openAuthModal} className="header__authorizationBtn">
        Log in
      </button>
    </header>
  );
};
