import { useDispatch, useSelector } from "react-redux";
import "../ProductPage/ProductPage.css";
import { useEffect } from "react";
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
} from "../../store/modals";
import { addToCart } from "../../store/cart";

export const ProductPage = () => {
  const REST_API = useSelector((state) => state.modals.api);
  const productData = useSelector((state) => state.products.currentProduct);
  const cartProducts = useSelector((state) => state.cart.cartProducts);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const { id } = useParams();

  useEffect(() => {
    const response = axios.get(`${REST_API}/products/${id}`);
    response.then((product) => {
      dispatch(
        setCurrentProduct({
          value: {
            id: product.data.id,
            category: product.data.category,
            img: product.data.img,
            brand: product.data.brand,
            color: product.data.color,
            price: product.data.price,
            description: product.data.description,
          },
        })
      );
    });
  }, [window.location.href]);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const electedProducts = useSelector(
    (state) => state.electedProducts.electedProducts
  );

  const isElected = () => {
    if (electedProducts && userData) {
      const userElected = electedProducts.filter(
        (product) => product.userId === userData.id
      );
      return userElected.filter(
        (product) => product.productId === productData.id
      )[0];
    } else {
      return false;
    }
  };

  const addProductToCart = (event) => {
    event.stopPropagation();
    dispatch(
      addToCart({
        id: +id,
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

  const addElectedProduct = (event) => {
    event.stopPropagation();
    if (cookies.token) {
      const product = {
        userId: userData.id,
        productId: productData.id,
        category: productData.category,
        img: productData.img,
        brand: productData.brand,
        color: productData.color,
        price: productData.price,
        description: productData.description,
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
      (product) => product.productId !== productData.id
    );
    dispatch(setElectedProducts({ value: [...updateElectedProducts] }));
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
            <button className="actions__checkoutBtn">Checkout</button>
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
