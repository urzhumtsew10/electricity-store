import {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useLazyGetCategoriesQuery,
} from "../../api";
import { CategoryCard } from "./CategoryCard/CategoryCard";
import "../Categories/Categories.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const Categories = () => {
  const REST_API = useSelector((state) => state.modals.api);
  const { data } = useGetCategoriesQuery();
  const [fetchCategories] = useLazyGetCategoriesQuery();
  const [isActiveSeeMore, setActiveSeeMore] = useState(true);
  const products = useGetProductsQuery();

  const addNewCategory = async (product) => {
    if (product) {
      const title =
        product.category[0].toUpperCase() +
        product.category.slice(1, product.category.length).toLowerCase();
      const response = await axios.post(`${REST_API}/categories`, {
        title: title,
        img: product.img,
      });
      fetchCategories();
    }
  };

  const deleteCategory = async (category) => {
    const response = await axios.delete(
      `${REST_API}/categories/${category.id}`
    );
    fetchCategories();
  };

  const showMoreCategories = () => {
    setActiveSeeMore(false);
  };

  const roolUpCategories = () => {
    setActiveSeeMore(true);
  };

  useEffect(() => {
    if (products.data && data) {
      const categories = data.map((category) => category.title.toLowerCase());
      const newCategory = products.data.filter((product) => {
        if (!categories.includes(product.category)) {
          categories.push(product.category);
          return true;
        }
        return false;
      })[0];

      addNewCategory(newCategory);

      const productsCategories = products.data.map(
        (product) => product.category
      );

      const redundantCategories = categories.filter(
        (category) => !productsCategories.includes(category)
      );

      data.forEach((category) => {
        if (redundantCategories.includes(category.title.toLowerCase())) {
          deleteCategory(category);
        }
      });
    }
  }, [products]);

  const categories = data && isActiveSeeMore ? data.slice(0, 8) : data;

  return (
    <div className="contentCategory">
      <h2 className="contentCategories__title">Categories</h2>
      <div className="contentCategories__categories">
        {data &&
          categories.map(({ title, id, img }) => (
            <CategoryCard key={id} title={title} img={img} />
          ))}
      </div>
      {isActiveSeeMore && (
        <button onClick={showMoreCategories} className="contentCategories__btn">
          See more
        </button>
      )}
      {!isActiveSeeMore && (
        <button onClick={roolUpCategories} className="contentCategories__btn">
          Roll Up
        </button>
      )}
    </div>
  );
};
