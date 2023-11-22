import { useState } from "react";
import { useGetProductsQuery } from "../../api";
import { ProductCard } from "../Products/ProductCard/ProductCard";
import "../Products/Products.css";

export const Products = () => {
  const { data } = useGetProductsQuery();
  const [isActiveSeeMore, setActiveSeeMore] = useState(true);

  const showMoreProducts = () => {
    setActiveSeeMore(false);
  };

  const rollUpProducts = () => {
    setActiveSeeMore(true);
  };

  const products = data && isActiveSeeMore ? data.slice(0, 15) : data;
  return (
    <div className="contentProducts">
      <h2 className="contentProducts__title">Products</h2>
      <div className="contentProducts__products">
        {data &&
          products.map(
            ({ category, id, brand, color, price, img, description }) => (
              <ProductCard
                key={id}
                id={id}
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
