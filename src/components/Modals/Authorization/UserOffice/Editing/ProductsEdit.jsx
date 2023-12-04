import { ProductEditCard } from "./ProductEditCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const ProductsEdit = () => {
  const data = useSelector((state) => state.products.products);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  const searchProducts = (event) => {
    const searchReg = new RegExp(`${event.target.value.toLowerCase()}`);
    const filteredProducts = data.filter((product) => {
      if (event.target.value === "") {
        return true;
      }
      const productString =
        `${product.category} ${product.brand} ${product.color} ${product.description}`.toLowerCase();
      return searchReg.test(productString);
    });
    setProducts(filteredProducts);
  };

  return (
    <div className="contentEdit__productsEdit">
      <input
        onChange={searchProducts}
        className="productsEdit__input"
        type="text"
        placeholder="search product"
      />
      <div className="productsEdit__products">
        {data &&
          products.map((product) => (
            <ProductEditCard
              key={product._id}
              id={product._id}
              img={product.img}
              category={product.category}
              brand={product.brand}
              color={product.color}
              price={product.price}
            />
          ))}
      </div>
    </div>
  );
};
