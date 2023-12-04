import heart from "../../../img/icon-heart.svg";
import cart from "../../../img/icon-cart.svg";
import icon_full_heart from "../../../img/icon-full-heart.svg";

import "../ProductCard/ProductCard.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../store/cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  setActiveAuthForm,
  setActiveAuthModal,
  setActiveUserOffice,
} from "../../../store/modals";
import { useEffect, useState } from "react";
import { setElectedProducts } from "../../../store/elected";
import { useCookies } from "react-cookie";

import { dotStream } from "ldrs";
dotStream.register();

export const ProductCard = ({
  category,
  id,
  brand,
  color,
  price,
  img,
  description,
}) => {
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const electedProducts = useSelector(
    (state) => state.electedProducts.electedProducts
  );
  const REST_API = useSelector((state) => state.modals.api);
  const [cookies, setCookie] = useCookies(["token"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (cookies.token) {
      const response = axios.get(`${REST_API}/elected`);
      response.then((elected) => {
        if (elected.data) {
          const userElectedProducts = elected.data.filter(
            (product) => product.userEmail === userData.email
          );
          dispatch(setElectedProducts({ value: userElectedProducts }));
        }
      });
    }
  }, [cookies.token]);

  const [isLoading, setIsLoading] = useState(false);

  const isElected = () => {
    if (electedProducts && userData) {
      const userElected = electedProducts.filter(
        (product) => product.userEmail === userData.email
      );
      return userElected.filter((product) => product.productId === id)[0];
    } else {
      return false;
    }
  };

  const addProductToCart = (event) => {
    event.stopPropagation();
    dispatch(
      addToCart({
        id: id,
        category: category,
        img: img,
        brand: brand,
        color: color,
        price: price,
        description: description,
      })
    );
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    navigate("/cart");
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const openProductPage = () => {
    navigate(`/product/${id}`);
    window.scroll({
      top: 0,
      left: 0,
    });
  };

  const addElectedProduct = async (event) => {
    setIsLoading(true);
    event.stopPropagation();
    if (cookies.token) {
      const product = {
        userEmail: userData.email,
        productId: id,
        category: category,
        img: img,
        brand: brand,
        color: color,
        price: price,
        description: description,
      };

      const response = await axios.post(`${REST_API}/elected`, {
        ...product,
      });
      dispatch(setElectedProducts({ value: response.data }));
    } else {
      dispatch(setActiveAuthModal({ isActive: true }));
      dispatch(setActiveAuthForm({ isActive: true }));
      dispatch(setActiveUserOffice({ isActive: false }));
      document.body.style.overflow = "hidden";
    }
    setIsLoading(false);
  };

  const removeElectedProduct = async (event) => {
    setIsLoading(true);
    event.stopPropagation();
    const response = await axios.delete(`${REST_API}/elected/${id}`);
    dispatch(setElectedProducts({ value: response.data }));
    setIsLoading(false);
  };

  return (
    <div onClick={openProductPage} className="products__product">
      {isLoading && (
        <div className="product__loading">
          <l-dot-stream size="80" speed="1.75" color="#0d63f3"></l-dot-stream>
        </div>
      )}
      {isElected() && (
        <img
          onClick={removeElectedProduct}
          className="product__favorites-elected"
          src={icon_full_heart}
          alt="heart"
        />
      )}
      {!isElected() && (
        <img
          onClick={addElectedProduct}
          className="product__favorites"
          src={heart}
          alt="heart"
        />
      )}
      <div className="product__priviewBlock">
        <img className="priviewBlock__img" src={img} alt="product img" />
      </div>
      <div className="product__aboutProduct">
        <h2 className="aboutProduct__price">{price}$</h2>
        <p className="aboutProduct__text">
          {brand} {category} {description} {color}
        </p>
      </div>
      <div className="product__blockActions">
        <button onClick={openProductPage} className="blockActions__buy">
          Buy
        </button>
        <img
          onClick={addProductToCart}
          className="blockActions__cart"
          src={cart}
        />
      </div>
    </div>
  );
};
