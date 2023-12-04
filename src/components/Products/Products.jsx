import { useEffect, useState } from "react";
import { ProductCard } from "../Products/ProductCard/ProductCard";
import "../Products/Products.css";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../store/products";
import axios from "axios";

export const Products = () => {
  const products = useSelector((state) => state.products.products);
  const REST_API = useSelector((state) => state.modals.api);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${REST_API}/products`).then((res) => {
      dispatch(setProducts({ value: res.data }));
    });
  }, []);

  const [isActiveSeeMore, setActiveSeeMore] = useState(true);

  const showMoreProducts = () => {
    setActiveSeeMore(false);
  };

  const rollUpProducts = () => {
    setActiveSeeMore(true);
  };

  const productsLength =
    products && isActiveSeeMore ? products.slice(0, 15) : products;
  return (
    <div className="contentProducts">
      <h2 className="contentProducts__title">Products</h2>
      <div className="contentProducts__products">
        {products &&
          productsLength.map(
            ({ category, _id, brand, color, price, img, description }) => (
              <ProductCard
                key={_id}
                id={_id}
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
      {isActiveSeeMore && (
        <div onClick={showMoreProducts} className="contentProducts__btn">
          See more
        </div>
      )}
      {!isActiveSeeMore && (
        <div onClick={rollUpProducts} className="contentProducts__btn">
          Rool Up
        </div>
      )}
    </div>
  );
};
