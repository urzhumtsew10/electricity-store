import "../Elected/Elected.css";
import icon_arrow from "../../img/arrow.svg";
import { ProductCard } from "../Products/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { setElectedProducts } from "../../store/elected";
import { useEffect } from "react";
import axios from "axios";

export const Elected = () => {
  const REST_API = useSelector((state) => state.modals.api);
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["token"]);

  const electedProducts = useSelector(
    (state) => state.electedProducts.electedProducts
  );
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const response = axios.get(`${REST_API}/elected`);
    response.then((electedProducts) => {
      const userElectedProducts = electedProducts.data.filter(
        (product) => product.userId === userData.id
      );
      dispatch(setElectedProducts({ value: userElectedProducts }));
    });
  }, [cookies.token]);

  const goBackHome = () => {
    window.history.back();
  };

  return (
    <div className="electedContent">
      <img
        onClick={goBackHome}
        className="electedContent__arrow"
        src={icon_arrow}
        alt="arrow"
      />
      <p onClick={goBackHome} className="electedContent__text">
        Back
      </p>
      <div className="electedContent__electedProducts">
        {electedProducts.map(
          ({ productId, category, brand, color, price, img, description }) => (
            <ProductCard
              key={productId}
              id={productId}
              category={category}
              brand={brand}
              color={color}
              img={img}
              description={description}
              price={price}
            />
          )
        )}
      </div>
    </div>
  );
};
