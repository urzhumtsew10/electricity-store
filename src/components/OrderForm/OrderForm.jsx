import "../OrderForm/OrderForm.css";
import close_icon from "../../img/icon-close.svg";
import { useDispatch, useSelector } from "react-redux";
import { setOrderForm } from "../../store/modals";
import cash from "../../img/cash.svg";
import card from "../../img/card.svg";
import visa_logo from "../../img/visa-logo.svg";
import icon_error from "../../img/fail.svg";
import { useEffect, useRef, useState } from "react";
import checkmark from "../../img/checkmark.png";
import sound from "../../audio/success.mp3";
import { removeAllProducts } from "../../store/cart";
import { useNavigate } from "react-router-dom";

export const OrderForm = () => {
  const dispatch = useDispatch();
  const [methodPay, setMethodPay] = useState("cash");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const products = useSelector((state) => state.products.products);

  const navigate = useNavigate();

  const productId = window.location.href.split("/")[4];

  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputAddressRef = useRef(null);

  const closeOrderForm = () => {
    dispatch(setOrderForm({ isActive: false }));
    document.body.style.overflow = "inherit";
  };

  const closeSuccessMessage = () => {
    setIsSuccess(false);
    dispatch(setOrderForm({ isActive: false }));
    document.body.style.overflow = "inherit";
    navigate("/");
  };

  const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
  const userData = JSON.parse(localStorage.getItem("userData"));

  const DELIVERY_COST = 20;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!productId) {
      const productsTotal = cartProducts.reduce((acc, product) => {
        acc += product.counter * product.price;
        return acc;
      }, 0);
      setTotal(productsTotal + DELIVERY_COST);
    } else {
      const product = products.filter(
        (product) => product._id === productId
      )[0];
      setTotal(product.price);
    }
  }, [productId]);

  const chooseCash = () => {
    setMethodPay("cash");
  };

  const chooseCard = () => {
    setMethodPay("card");
  };

  const numberCard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const numberCardRef = useRef(null);
  let focusIndex = 0;

  const focusInput = () => {
    if (numberCardRef.current.children[focusIndex]) {
      numberCardRef.current.children[focusIndex].focus();
    }
  };

  const enterNumber = (event) => {
    numberCardRef.current.children[focusIndex].value =
      event.target.value[event.target.value.length - 1];
    if (focusIndex <= numberCard.length - 1 && !isNaN(event.target.value)) {
      if (focusIndex !== 15) {
        focusIndex += 1;
      }
      focusInput();
    }
    if (isNaN(event.target.value)) {
      numberCardRef.current.children[focusIndex].value = "";
    }
  };

  const removeNumber = (event) => {
    if (event.code === "Backspace") {
      numberCardRef.current.children[focusIndex].value = "";
      focusIndex -= 1;
      numberCardRef.current.children[focusIndex].value = "";
      focusInput();
    }
  };

  const tryAcceptOrder = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const numberCardArray = [];
    if (methodPay === "card") {
      for (let i = 0; i < numberCardRef.current.children.length; i++) {
        if (numberCardRef.current.children[i].value) {
          numberCardArray.push(numberCardRef.current.children[i].value);
        }
      }
    }
    const creditCardValidation =
      methodPay === "card" ? numberCardArray.length === 16 : true;
    if (
      !emailRegex.test(inputEmailRef.current.value) ||
      inputNameRef.current.value === "" ||
      inputAddressRef.current.value.length < 12 ||
      !creditCardValidation
    ) {
      setIsError(true);
    } else {
      setIsError(false);
      if (userData) {
        const orderData = {
          userEmail: userData.email,
          name: inputNameRef.current.value,
          email: inputEmailRef.current.value,
          address: inputAddressRef.current.value,
        };
        if (methodPay === "card") {
          orderData.numberCard = numberCardArray.join("");
        }
        if (productId) {
          const product = products.filter(
            (product) => product._id === productId
          );
          orderData.products = product;
          orderData.total = product[0].price + DELIVERY_COST;
        } else {
          const totalProducts = cartProducts.reduce((acc, product) => {
            acc += product.price * product.counter;
            return acc;
          }, 0);
          orderData.total = totalProducts + DELIVERY_COST;
          orderData.products = cartProducts;
          dispatch(removeAllProducts());
        }
        console.log(orderData);
      }
      setIsSuccess(true);
      const audio = new Audio(sound);
      audio.play();
    }
  };

  return (
    <div className="orderForm">
      {isSuccess && (
        <div className="orderForm__successMessage">
          <div className="successMessage__circle">
            <img className="circle__img" src={checkmark} alt="tick" />
          </div>
          <h3 className="successMessage__title">WELL DONE</h3>
          <p className="successMessage__text">
            Click continue to move <br /> to shopping.
          </p>
          <button onClick={closeSuccessMessage} className="successMessage__btn">
            Continue
          </button>
        </div>
      )}
      {!isSuccess && (
        <div className="orderForm__content">
          <img
            onClick={closeOrderForm}
            className="orderForm__close"
            src={close_icon}
            alt="close"
          />
          <h2 className="orderForm__title">Checkout</h2>
          {isError && (
            <div className="orderForm__errorDiv">
              <img className="errorDiv__img" src={icon_error} alt="error" />
              <p className="errorDiv__textError">
                <span className="textError__span">Oh snap!</span> <br /> Change
                a few things up and try <br /> submitting again.
              </p>
            </div>
          )}
          <form className="orderForm__form" action="submit">
            <input
              ref={inputNameRef}
              className="form__input"
              type="text"
              placeholder="Name"
            />
            <input
              ref={inputEmailRef}
              className="form__input"
              type="text"
              placeholder="Email"
            />
            <input
              ref={inputAddressRef}
              className="form__input"
              type="text"
              placeholder="Address (Ex. 10 Grove Road London)"
            />
          </form>
          <div className="orderFrom__methodPay">
            <div className={`methodPay__circle ${methodPay}`}></div>
            <img
              onClick={chooseCash}
              className="mathodPay__img"
              src={cash}
              alt="cash"
            />
            <p className="mwthodPay__total">{total}$</p>
            <img
              onClick={chooseCard}
              className="mathodPay__img"
              src={card}
              alt="card"
            />
          </div>
          {methodPay === "card" && (
            <div className="orderForm__bankCard">
              <p className="bankCard__title">Credit card</p>
              <img className="bankCard__img" src={visa_logo} alt="visa" />
              <p className="bankCard__userName">Your Name</p>
              <div ref={numberCardRef} className="bankCard__numberCard">
                {numberCard.map((id) => (
                  <input
                    onKeyUp={removeNumber}
                    onClick={focusInput}
                    onChange={enterNumber}
                    key={id}
                    className="numberCard__input"
                    type="text"
                    placeholder="0"
                  />
                ))}
              </div>
            </div>
          )}
          <button onClick={tryAcceptOrder} className="orderForm__btn">
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};
