import heart from "../../../img/icon-heart.svg";
import cart from "../../../img/icon-cart.svg";

import "../ProductCard/ProductCard.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../store/cart";
import { useNavigate } from "react-router-dom";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addProductToCart = () => {
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

  return (
    <div className="products__product">
      <img className="product__favorites" src={heart} alt="heart" />
      <div className="product__priviewBlock">
        <img
          className="priviewBlock__img"
          src={require(`../../../img/${img}`)}
          alt="product img"
        />
      </div>
      <div className="product__aboutProduct">
        <h2 className="aboutProduct__price">{price}$</h2>
        <p className="aboutProduct__text">
          {brand} {category} {description} {color}
        </p>
      </div>
      <div className="product__blockActions">
        <button onClick={addProductToCart} className="blockActions__buy">
          Buy
        </button>
        <img className="blockActions__cart" src={cart} />
      </div>
    </div>
  );
};
