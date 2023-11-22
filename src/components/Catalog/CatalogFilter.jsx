import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../api";
import { ItemFilter } from "./ItemFilter";
import { useDispatch } from "react-redux";
import { setCatalogFilter } from "../../store/catalog";
import { useNavigate } from "react-router-dom";

export const CatalogFilter = ({ title }) => {
  const products = useGetProductsQuery();
  const [brands, setBrands] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openCategoryPage = (brand) => {
    const categoryProcessing = title.split(" ").join("-");
    navigate(`/category/${categoryProcessing}`);
    dispatch(setCatalogFilter({ category: title, brand: brand }));
  };

  useEffect(() => {
    if (products.data) {
      const categoryBrands = products.data.reduce((acc, product) => {
        if (!acc.includes(product.brand) && product.category === title) {
          return [...acc, product.brand];
        }
        return acc;
      }, []);
      setBrands(categoryBrands);
    }
  }, [products.data]);

  return (
    <div className="content__catalogFilter">
      <button className="catalogFilter__title">{title.toUpperCase()}</button>
      <ul className="catalogFilter__catagoryList">
        {brands.map((brand) => (
          <ItemFilter
            key={brand}
            brand={brand}
            openCategoryPage={openCategoryPage}
          />
        ))}
      </ul>
    </div>
  );
};
