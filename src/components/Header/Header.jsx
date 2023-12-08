import logo from "../../img/logo.svg";
import cart from "../../img/icon-cart.svg";
import heart from "../../img/icon-heart.svg";
import search from "../../img/icon-search.svg";
import menu from "../../img/icon-menu.svg";
import user_icon from "../../img/icon-user.svg";
import icon_close from "../../img/icon-close.svg";
import arrow from "../../img/arrow.svg";
import "../Header/Header.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveAuthForm,
  setActiveAuthModal,
  setActiveUserOffice,
} from "../../store/modals";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { generateMenuList } from "../../store/menuAccount";
import { Catalog } from "../Catalog/Catalog";
import { setCatalogFilter } from "../../store/catalog";
import { CartProduct } from "../Cart/CartProduct";
import { SearchProduct } from "./SearchProduct";

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

  const openAuthModal = () => {
    dispatch(setActiveAuthModal({ isActive: true }));
    dispatch(setActiveAuthForm({ isActive: true }));
    dispatch(setActiveUserOffice({ isActive: false }));
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    if (!cookies.token) {
      localStorage.removeItem("userData");
    }
  }, [cookies.token]);

  const closeMobileMenu = () => {
    setActiveMobileMenu(false);
    document.body.style.overflow = "inherit";
  };

  const openElectedPage = () => {
    if (cookies.token) {
      closeMobileMenu();
      navigate("/elected");
    } else {
      openAuthModal();
    }
  };

  const openHomePage = () => {
    dispatch(setCatalogFilter({ category: "", brand: "" }));
    navigate("/");
  };

  const openCartPage = () => {
    closeMobileMenu();
    navigate("/cart");
  };

  const openMobileMenu = () => {
    setActiveMobileMenu(true);
    document.body.style.overflow = "hidden";
  };

  const products = useSelector((state) => state.products.products);
  const [isActiveSearch, setIsActive] = useState(false);
  const [resultSearchProducts, setResultSearchProducts] = useState([]);
  const inputSearchRef = useRef(null);
  const inputSearchMobileRef = useRef(null);

  const searchProducts = () => {
    const searchProducts = products.filter((product) => {
      const searchReg = new RegExp(
        `${inputSearchRef.current.value.toLowerCase()}`
      );
      const productTitle =
        `${product.category} ${product.brand} ${product.description} ${product.color}`.toLowerCase();
      if (inputSearchRef.current.value === "") {
        return false;
      } else {
        return searchReg.test(productTitle);
      }
    });
    setResultSearchProducts(searchProducts);
    setIsActive(true);
  };
  const searchProductsMobile = () => {
    const searchProducts = products.filter((product) => {
      const searchReg = new RegExp(
        `${inputSearchMobileRef.current.value.toLowerCase()}`
      );
      const productTitle =
        `${product.category} ${product.brand} ${product.description} ${product.color}`.toLowerCase();
      if (inputSearchMobileRef.current.value === "") {
        return false;
      } else {
        return searchReg.test(productTitle);
      }
    });
    inputSearchMobileRef.current.value = "";
    setResultSearchProducts(searchProducts);
    setIsActive(true);
  };

  const closeSearchProducts = () => {
    inputSearchRef.current.value = "";
    setIsActive(false);
  };

  const openCategories = () => {
    closeMobileMenu();
    navigate("/categories-mobile");
  };

  const openCatalogMobile = () => {
    closeMobileMenu();
    navigate("/catalog-mobile");
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
      {isActiveSearch && (
        <div className="header__searchProducts">
          <button
            onClick={closeSearchProducts}
            className="searchProducts__btnClose"
          >
            <img className="btnClose__img" src={icon_close} alt="close" />
          </button>
          {resultSearchProducts.length === 0 && (
            <p className="searchProducts__message">Not Found Products!</p>
          )}
          {products &&
            resultSearchProducts.map((product) => (
              <SearchProduct
                closeSearchProducts={closeSearchProducts}
                key={product._id}
                id={product._id}
                img={product.img}
                category={product.category}
                brand={product.brand}
                color={product.color}
                description={product.description}
                price={product.price}
              />
            ))}
        </div>
      )}
      <div className="header__searchDiv mobileSearch">
        <input
          ref={inputSearchMobileRef}
          className="searchDiv__input"
          type="text"
          placeholder="search product"
        />
        <div onClick={searchProductsMobile} className="searchDiv__buttonSearch">
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
        <Catalog />
        <div className="header__searchDiv">
          <input
            ref={inputSearchRef}
            className="searchDiv__input"
            type="text"
            placeholder="search product"
          />
          <div className="searchDiv__buttonSearch">
            <img
              onClick={searchProducts}
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
          <div className="header__viewPages">
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
          </div>
          <div className="horizontalLine"></div>
          <div
            onClick={openCategories}
            className="headerMobile__categoriesBtn section-box"
          >
            <p className="categoriesBtn__title section-title">Categories</p>
            <img
              className="categoriesBtn__arrow section-arrow"
              src={arrow}
              alt="arrow"
            />
          </div>
          <div
            onClick={openCatalogMobile}
            className="headerMobile__catalogBtn section-box"
          >
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
