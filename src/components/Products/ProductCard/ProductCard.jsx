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
import { useEffect } from "react";
import { setElectedProducts } from "../../../store/elected";
import { useCookies } from "react-cookie";

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
  const [cookies, setCookie] = useCookies(["token"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (cookies.token) {
      const response = axios.get("http://localhost:3030/elected");
      response.then((electedProducts) => {
        const userElectedProducts = electedProducts.data.filter(
          (product) => product.userId === userData.id
        );
        dispatch(setElectedProducts({ value: userElectedProducts }));
      });
    }
  }, [cookies.token]);

  const isElected = () => {
    if (electedProducts && userData) {
      const userElected = electedProducts.filter(
        (product) => product.userId === userData.id
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

  const addElectedProduct = (event) => {
    event.stopPropagation();
    if (cookies.token) {
      const product = {
        userId: userData.id,
        productId: id,
        category: category,
        img: img,
        brand: brand,
        color: color,
        price: price,
        description: description,
      };
      axios.post("http://localhost:3030/elected", { ...product });
      if (electedProducts) {
        dispatch(
          setElectedProducts({ value: [...electedProducts, { ...product }] })
        );
      } else {
        dispatch(setElectedProducts({ value: [product] }));
      }
    } else {
      dispatch(setActiveAuthModal({ isActive: true }));
      dispatch(setActiveAuthForm({ isActive: true }));
      dispatch(setActiveUserOffice({ isActive: false }));
      document.body.style.overflow = "hidden";
    }
  };

  const removeElectedProduct = (event) => {
    event.stopPropagation();
    axios.delete(`http://localhost:3030/elected/${id}`);
    const updateElectedProducts = electedProducts.filter(
      (product) => product.productId !== id
    );
    dispatch(setElectedProducts({ value: [...updateElectedProducts] }));
  };

  const productImg = img.length > 50 ? img : require(`../../../img/${img}`);

  return (
    <div onClick={openProductPage} className="products__product">
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
        <img className="priviewBlock__img" src={productImg} alt="product img" />
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
