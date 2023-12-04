import { useDispatch, useSelector } from "react-redux";
import "../ProductPage/ProductPage.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { setCurrentProduct } from "../../store/products";
import icon_heart from "../../img/icon-heart.svg";
import icon_full_heart from "../../img/icon-full-heart.svg";
import icon_arrow from "../../img/arrow.svg";
import { useCookies } from "react-cookie";
import { setElectedProducts } from "../../store/elected";
import {
  setActiveAuthForm,
  setActiveAuthModal,
  setActiveUserOffice,
  setOrderForm,
} from "../../store/modals";
import { addToCart } from "../../store/cart";
import { dotStream } from "ldrs";

dotStream.register();

export const ProductPage = () => {
  const productData = useSelector((state) => state.products.currentProduct);
  const cartProducts = useSelector((state) => state.cart.cartProducts);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const { id } = useParams();
  const products = useSelector((state) => state.products.products);

  const [isLoading, setIsLoading] = useState(false);
  const REST_API = useSelector((state) => state.modals.api);

  useEffect(() => {
    if (products) {
      const product = products.filter((product) => product._id === id)[0];
      dispatch(
        setCurrentProduct({
          value: {
            id: product._id,
            category: product.category,
            img: product.img,
            brand: product.brand,
            color: product.color,
            price: product.price,
            description: product.description,
          },
        })
      );
    }
  }, [window.location.href]);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const electedProducts = useSelector(
    (state) => state.electedProducts.electedProducts
  );

  const isElected = () => {
    if (electedProducts && userData) {
      const userElected = electedProducts.filter(
        (product) => product.userEmail === userData.email
      );
      return userElected.filter(
        (product) => product.productId === productData.id
      )[0];
    } else {
      return false;
    }
  };

  const openOrderForm = () => {
    dispatch(setOrderForm({ isActive: true }));
    document.body.style.overflow = "hidden";
  };

  const addProductToCart = (event) => {
    event.stopPropagation();
    dispatch(
      addToCart({
        id: id,
        category: productData.category,
        img: productData.img,
        brand: productData.brand,
        color: productData.color,
        price: productData.price,
        description: productData.description,
      })
    );
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    navigate("/cart");
  };

  const addElectedProduct = async (event) => {
    setIsLoading(true);
    event.stopPropagation();
    if (cookies.token) {
      const product = {
        userEmail: userData.email,
        productId: productData.id,
        category: productData.category,
        img: productData.img,
        brand: productData.brand,
        color: productData.color,
        price: productData.price,
        description: productData.description,
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

  const goBackHome = () => {
    window.history.back();
  };

  const productImg = () => {
    return productData.img.length > 50
      ? productData.img
      : require(`../../img/${productData.img}`);
  };
  return (
    <div className="contentProductPage">
      <img
        onClick={goBackHome}
        className="productContent__arrow"
        src={icon_arrow}
        alt="arrow"
      />
      <p onClick={goBackHome} className="productContent__text">
        Back
      </p>
      <div className="contentProductPage__viewProduct">
        <div className="viewProduct__blockImg">
          {isLoading && (
            <div className="product__loading">
              <l-dot-stream
                size="92"
                speed="1.75"
                color="#0d63f3"
              ></l-dot-stream>
            </div>
          )}
          {isElected() && (
            <img
              onClick={removeElectedProduct}
              className="blockImg__iconFullHeart"
              src={icon_full_heart}
              alt="heart"
            />
          )}
          {!isElected() && (
            <img
              onClick={addElectedProduct}
              className="blockImg__iconHeart"
              src={icon_heart}
              alt="heart"
            />
          )}
          {productData.img && (
            <img
              className="blockImg__productImg"
              src={productImg()}
              alt="img"
            />
          )}
        </div>
        <div className="viewProduct__productInfo">
          <p className="productInfo__description">
            {productData.category} {productData.brand} {productData.color}{" "}
            {productData.description}
          </p>
          <div
            style={{ backgroundColor: productData.color }}
            className="productInfo__color"
          ></div>
          <p className="productInfo__price">{productData.price}$</p>
          <div className="productInfo__actions">
            <button onClick={openOrderForm} className="actions__checkoutBtn">
              Checkout
            </button>
            <button
              onClick={addProductToCart}
              className="actions__addToCartBtn"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
