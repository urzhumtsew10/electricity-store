import heart from "../../../img/icon-heart.svg";
import cart from "../../../img/icon-cart.svg";

import "../ProductCard/ProductCard.css";

export const ProductCard = ({
  category,
  id,
  brand,
  color,
  price,
  img,
  description,
}) => {
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
        <button className="blockActions__buy">Buy</button>
        <img className="blockActions__cart" src={cart} />
      </div>
    </div>
  );
};
