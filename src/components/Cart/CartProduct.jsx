import { useDispatch } from "react-redux";
import icon_cross from "../../svg/icon-cross.svg";
import {
  decrementQuantity,
  deleteProduct,
  incrementQuantity,
} from "../../store/cart";

export const CartProduct = ({
  img,
  category,
  brand,
  color,
  price,
  counter,
  id,
}) => {
  const dispatch = useDispatch();

  const deleteFromCart = () => {
    dispatch(deleteProduct({ id: id }));
  };

  const decrementProductQuantity = () => {
    dispatch(decrementQuantity({ id: id }));
  };

  const incrementProductQuantity = () => {
    dispatch(incrementQuantity({ id: id }));
  };

  return (
    <div className="products__cartProduct">
      <img
        onClick={deleteFromCart}
        className="cartProduct__imgDelete"
        src={icon_cross}
        alt="cross"
      />

      <img
        className="cartProduct__img"
        src={require(`../../img/${img}`)}
        alt="product"
      />
      <p className="cartProduct__title">
        {brand} {category} {color}
      </p>
      <p className="cartProduct__price">{price}$</p>
      <div className="cartProduct__productQuantity">
        <p
          onClick={decrementProductQuantity}
          className="productQuantity__decrement"
        >
          -
        </p>
        <p className="productQuantity__counter">{counter}</p>
        <p
          onClick={incrementProductQuantity}
          className="productQuantity__increment"
        >
          +
        </p>
      </div>
      <p className="cartProduct__total">{price * counter}$</p>
    </div>
  );
};
