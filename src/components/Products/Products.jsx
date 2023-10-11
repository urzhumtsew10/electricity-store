import { useGetProductsQuery } from "../../api";
import { ProductCard } from "../Products/ProductCard/ProductCard";
import "../Products/Products.css";

export const Products = () => {
  const { data } = useGetProductsQuery();
  return (
    <div className="contentProducts">
      <h2 className="contentProducts__title">Products</h2>
      <div className="contentProducts__products">
        {data &&
          data
            .slice(0, 25)
            .map(({ category, id, brand, color, price, img, description }) => (
              <ProductCard
                key={id}
                category={category}
                brand={brand}
                color={color}
                img={img}
                description={description}
                price={price}
              />
            ))}
      </div>
      <div className="contentProducts__btn">See more</div>
    </div>
  );
};
