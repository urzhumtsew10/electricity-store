import { useEffect, useState } from "react";
import { ProductCard } from "../Products/ProductCard/ProductCard";
import "../Products/Products.css";
import { useDispatch, useSelector } from "react-redux";
import { setIsSeeMore, setProducts } from "../../store/products";
import axios from "axios";

export const Products = () => {
  const products = useSelector((state) => state.products.products);
  const REST_API = useSelector((state) => state.modals.api);
  const isSeeMore = useSelector((state) => state.products.isSeeMore);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${REST_API}/products`).then((res) => {
      dispatch(setProducts({ value: res.data }));
    });
  }, []);

  const showMoreProducts = () => {
    dispatch(setIsSeeMore({ value: false }));
  };

  const rollUpProducts = () => {
    dispatch(setIsSeeMore({ value: true }));
  };

  const productsLength =
    products && isSeeMore ? products.slice(0, 15) : products;
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
      {isSeeMore && (
        <div onClick={showMoreProducts} className="contentProducts__btn">
          See more
        </div>
      )}
      {!isSeeMore && (
        <div onClick={rollUpProducts} className="contentProducts__btn">
          Rool Up
        </div>
      )}
    </div>
  );
};
