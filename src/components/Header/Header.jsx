import logo from "../../img/logo.svg";
import cart from "../../img/icon-cart.svg";
import heart from "../../img/icon-heart.svg";
import search from "../../img/icon-search.svg";
import menu from "../../img/icon-menu.svg";
import user_icon from "../../img/icon-user.svg";
import icon_close from "../../img/icon-close.svg";
import arrow from "../../img/arrow.svg";
import "../Header/Header.css";
import { useDispatch } from "react-redux";
import {
  setActiveAuthForm,
  setActiveAuthModal,
  setActiveUserOffice,
} from "../../store/modals";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { generateMenuList } from "../../store/menuAccount";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["token"]);

  const [isActiveMobileMenu, setActiveMobileMenu] = useState(false);
  const activeClass = isActiveMobileMenu ? "active" : "";

  const openUserOffice = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    dispatch(generateMenuList({ role: userData.role }));

    dispatch(setActiveAuthModal({ isActive: true }));
    dispatch(setActiveAuthForm({ isActive: false }));
    dispatch(setActiveUserOffice({ isActive: true }));
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    if (!cookies.token) {
      localStorage.removeItem("userData");
    }
  }, [cookies.token]);

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
    dispatch(setActiveAuthForm({ isActive: true }));
    dispatch(setActiveUserOffice({ isActive: false }));
    document.body.style.overflow = "hidden";
  };

  const openMobileMenu = () => {
    setActiveMobileMenu(true);
    document.body.style.overflow = "hidden";
  };

  const closeMobileMenu = () => {
    setActiveMobileMenu(false);
    document.body.style.overflow = "inherit";
  };

  return (
    <header className="header">
      <div onClick={openMobileMenu} className="header__menu">
        <span className="menu__span"></span>
      </div>
      <img
        onClick={openHomePage}
        className="header__logo"
        src={logo}
        alt="log"
      />
      <div className="header__searchDiv mobileSearch">
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
      <div className="header--desktop">
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
        <div
          onClick={openElectedPage}
          className="header__electedBtn header-btn"
        >
          <img
            className="electedBtn__img header-icon"
            src={heart}
            alt="heart"
          />
        </div>
        <div onClick={openCartPage} className="header__cartBtn header-btn">
          <img className="cartBtn__img header-icon" src={cart} alt="cart" />
        </div>
        {!cookies.token && (
          <button onClick={openAuthModal} className="header__authorizationBtn">
            Log in
          </button>
        )}
        {cookies.token && (
          <img
            onClick={openUserOffice}
            className="header__authIcon"
            src={user_icon}
            alt="icon"
          />
        )}
      </div>
      <div className={`header--mobile ${activeClass}`}>
        <div className={`headerMobile__content ${activeClass}`}>
          <img
            onClick={closeMobileMenu}
            className="headerMobile__iconClose"
            src={icon_close}
            alt="icon-close"
          />
          {!cookies.token && (
            <button onClick={openAuthModal} className="headerMobile__Login">
              Log in
            </button>
          )}
          {cookies.token && (
            <img
              onClick={openUserOffice}
              className="header__authIcon"
              src={user_icon}
              alt="icon"
            />
          )}
          <div className="horizontalLine"></div>
          <div className="headerMobile__categoriesBtn section-box">
            <p className="categoriesBtn__title section-title">Categories</p>
            <img
              className="categoriesBtn__arrow section-arrow"
              src={arrow}
              alt="arrow"
            />
          </div>
          <div className="headerMobile__catalogBtn section-box">
            <p className="catalogBtn__title section-title">Product catalog</p>
            <img
              className="catalogBtn__arrow section-arrow"
              src={arrow}
              alt="arrow"
            />
          </div>
          <p className="headerMobile__infoService">Information service</p>
          <a href="contact.@nextstore.com" className="headerMobile__usEmail">
            contact.@nextstore.com
          </a>
          <a href="tel:+998955030909" className="headerMobile__usPhone">
            +998 95 503 09 09
          </a>
        </div>
      </div>
    </header>
  );
};
