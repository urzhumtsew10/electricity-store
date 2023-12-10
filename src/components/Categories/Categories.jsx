import { CategoryCard } from "./CategoryCard/CategoryCard";
import "../Categories/Categories.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../store/categories";
import { setIsSeeMore } from "../../store/categories";

export const Categories = () => {
  const REST_API = useSelector((state) => state.modals.api);
  const products = useSelector((state) => state.products.products);
  const isSeeMore = useSelector((state) => state.categories.isSeeMore);
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${REST_API}/categories`).then((categories) => {
      dispatch(setCategories({ value: categories.data }));
    });
  }, []);

  const addNewCategory = async (product) => {
    if (product && product.category !== products[0].category) {
      const title =
        product.category[0].toUpperCase() +
        product.category.slice(1, product.category.length).toLowerCase();
      const response = await axios.post(`${REST_API}/categories`, {
        title: title,
        img: product.img,
      });
      dispatch(setCategories({ value: response.data }));
    }
  };

  const deleteCategory = async (category) => {
    const response = await axios.delete(
      `${REST_API}/categories/${category._id}`
    );
    dispatch(setCategories({ value: response.data }));
  };

  const showMoreCategories = () => {
    dispatch(setIsSeeMore({ value: false }));
  };

  const roolUpCategories = () => {
    dispatch(setIsSeeMore({ value: true }));
  };

  useEffect(() => {
    if (products && categories) {
      const categoriesArray = categories.map((category) =>
        category.title.toLowerCase()
      );
      const newCategory = products.filter((product) => {
        if (!categoriesArray.includes(product.category)) {
          categoriesArray.push(product.category);
          return true;
        }
        return false;
      })[0];

      addNewCategory(newCategory);

      const productsCategories = products.map((product) => product.category);

      const redundantCategories = categories.filter(
        (category) => !productsCategories.includes(category.title.toLowerCase())
      );

      redundantCategories.forEach((category) => {
        deleteCategory(category);
      });
    }
  }, [products]);

  const categoriesData =
    categories && isSeeMore ? categories.slice(0, 8) : categories;

  return (
    <div className="contentCategory">
      <h2 className="contentCategories__title">Categories</h2>
      <div className="contentCategories__categories">
        {categories &&
          categoriesData.map(({ title, _id, img }) => (
            <CategoryCard key={_id} title={title} img={img} />
          ))}
      </div>
      {isSeeMore && (
        <button onClick={showMoreCategories} className="contentCategories__btn">
          See more
        </button>
      )}
      {!isSeeMore && (
        <button onClick={roolUpCategories} className="contentCategories__btn">
          Roll Up
        </button>
      )}
    </div>
  );
};
