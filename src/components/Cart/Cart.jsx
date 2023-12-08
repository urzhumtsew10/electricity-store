import { useDispatch, useSelector } from "react-redux";
import "../Cart/Cart.css";
import { CartProduct } from "./CartProduct";
import { useEffect } from "react";
import icon_arrow from "../../img/arrow.svg";
import { setOrderForm } from "../../store/modals";

export const Cart = () => {
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  // const sumProducts = cartProducts.reduce((acc, product) => {
  //   acc += product.price * product.counter;
  //   return acc;
  // }, 0);

  const goBackHome = () => {
    window.history.back();
  };

  const openOrderForm = () => {
    dispatch(setOrderForm({ isActive: true }));
    document.body.style.overflow = "hidden";
  };

  const DELIVERY_COST = 20;

  return (
    <div className="cartContent">
      <img
        onClick={goBackHome}
        className="cartContent__arrow"
        src={icon_arrow}
        alt="arrow"
      />
      <p onClick={goBackHome} className="cartContent__text">
        Back
      </p>
      <div className="cartContent__cartInfo">
        <p className="cartInfo__productColumn">Product</p>
        <p className="cartInfo__priceColumn">Price</p>
        <p className="cartInfo__quantityColumn">Qity</p>
        <p className="cartInfo__totalColumn">Total</p>
      </div>
      <div className="cartContent__products">
        {cartProducts.map((product) => (
          <CartProduct
            key={product.id}
            id={product.id}
            img={product.img}
            category={product.category}
            brand={product.brand}
            color={product.color}
            counter={product.counter}
            price={product.price}
          />
        ))}
      </div>
      <div className="cartContent__considerTotalPrice">
        <div className="considerTotalPrice__subtotal">
          <p className="subtotal__text">Subtotal</p>
          <p className="subtotal__total">{100}$</p>
        </div>
        <div className="considerTotalPrice__shipping">
          <p className="shipping__text">Shipping fee</p>
          <p className="shipping__total">{DELIVERY_COST}$</p>
        </div>
        <div className="considerTotalPrice__total">
          <p className="total__text">TOTAL</p>
          <p className="total__bill">{100 + DELIVERY_COST}$</p>
        </div>
        <button onClick={openOrderForm} className="considerTotalPrice__btn">
          Checkout
        </button>
      </div>
    </div>
  );
};
