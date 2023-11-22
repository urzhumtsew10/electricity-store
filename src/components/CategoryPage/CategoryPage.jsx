import { useEffect, useRef, useState } from "react";
import "../CategoryPage/CategoryPage.css";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../api";
import { SliderImages } from "../SliderImages/SliderImages";
import { FilterInput } from "./FilterInput";
import banner_01 from "../../img/banner-01.jpg";
import banner_03 from "../../img/banner_03.png";
import search from "../../img/icon-search.svg";
import { ProductCard } from "../Products/ProductCard/ProductCard";
import Slider from "react-slider";
import { useSelector } from "react-redux";

export const CategoryPage = () => {
  const { category } = useParams();
  const [categoryData, setCategoryData] = useState({});
  const [filter, setFilter] = useState({});
  const { data } = useGetProductsQuery();
  const [priceValues, setPriceValues] = useState([10, 10000]);
  const brandsRef = useRef(null);
  const colorsRef = useRef(null);
  const priceRef = useRef(null);
  const searchRef = useRef(null);

  const correctCategory = category.split("-").join(" ");

  const catalogFilter = useSelector((state) => state.catalog.catalogFilter);

  useEffect(() => {
    if (data) {
      const products = data.filter(
        (product) => product.category === correctCategory
      );
      const brands = data.reduce((acc, product) => {
        if (
          product.category === correctCategory &&
          !acc.includes(product.brand)
        ) {
          return [...acc, product.brand];
        }
        return acc;
      }, []);
      const colors = data.reduce((acc, product) => {
        if (
          product.category === correctCategory &&
          !acc.includes(product.color)
        ) {
          return [...acc, product.color];
        }
        return acc;
      }, []);
      if (Boolean(catalogFilter.brand)) {
        const filteredByBrand = products.filter(
          (product) => product.brand === catalogFilter.brand
        );
        setCategoryData({
          products: filteredByBrand,
          brands: brands,
          colors: colors,
        });
      } else {
        setCategoryData({
          products: products,
          brands: brands,
          colors: colors,
        });
      }
    }
  }, [data, catalogFilter]);

  useEffect(() => {
    if (data && filter?.products) {
      const filteredProducts = data.filter((product) => {
        if (
          product.category === correctCategory &&
          filter.brands.includes(product.brand) &&
          filter.colors.includes(product.color) &&
          product.price >= filter.minPrice &&
          product.price <= filter.maxPrice
        ) {
          return true;
        }
        return false;
      });
      setCategoryData({ ...categoryData, products: filteredProducts });
    }
  }, [filter]);

  const updateFilter = (nodes) => {
    const arrayInput = [];
    for (let i = 0; i < nodes.length; i++) {
      arrayInput.push(nodes[i].children[0]);
    }
    return arrayInput
      .filter((input) => {
        if (input.checked) {
          return input;
        }
      })
      .map((input) => input.id);
  };

  const productsFiltering = () => {
    searchRef.current.value = "";
    const minPrice = priceRef.current.thumb0.ariaValueNow;
    const maxPrice = priceRef.current.thumb1.ariaValueNow;
    setPriceValues([minPrice, maxPrice]);
    const brandsDiv = brandsRef.current.children;
    const colorsDiv = colorsRef.current.children;
    const brands = updateFilter(brandsDiv).length
      ? updateFilter(brandsDiv)
      : categoryData.brands;
    const colors = updateFilter(colorsDiv).length
      ? updateFilter(colorsDiv)
      : categoryData.colors;
    setFilter({
      products: categoryData.products,
      colors: colors,
      brands: brands,
      minPrice: minPrice,
      maxPrice: maxPrice,
    });
  };

  const searchProduct = (event) => {
    const filteredProducts = data.filter((product) => {
      const searchReg = new RegExp(`${event.target.value.toLowerCase()}`);
      const productFullInfo =
        `${product.category} ${product.brand} ${product.color} ${product.description}`.toLowerCase();
      if (product.category === correctCategory && event.target.value === "") {
        return true;
      }
      return (
        product.category === correctCategory && searchReg.test(productFullInfo)
      );
    });
    setCategoryData({ ...categoryData, products: filteredProducts });
  };
  return (
    <>
      <SliderImages
        content={[
          { id: 1, img: banner_03 },
          { id: 2, img: banner_01 },
          { id: 3, img: banner_03 },
          { id: 4, img: banner_01 },
        ]}
      />
      <div className="contentPage__categoryPage">
        <div className="categoryPage__filterBox">
          <div className="filterBox__searchInputDiv">
            <input
              ref={searchRef}
              onChange={searchProduct}
              className="searchInputDiv__input"
              type="text"
            />
            <img className="searchInputDiv__img" src={search} alt="icon" />
          </div>
          <p className="filterBox__nameFilter">Brand</p>
          <form ref={brandsRef} className="filterBox__brandsForm filterForm">
            {categoryData?.brands &&
              categoryData.brands.map((brand) => (
                <FilterInput
                  key={brand}
                  productsFiltering={productsFiltering}
                  type="brand"
                  title={brand}
                />
              ))}
          </form>
          <p className="filterBox__nameFilter">Color</p>
          <form ref={colorsRef} className="filterBox__colorsForm filterForm">
            {categoryData?.colors &&
              categoryData.colors.map((color) => (
                <FilterInput
                  key={color}
                  productsFiltering={productsFiltering}
                  type="color"
                  title={color}
                />
              ))}
          </form>
          <p className="filterBox__nameFilter">Price</p>
          <div className="filterBox__infoPriceRange">
            <p className="infoPriceRange__minValue">{priceValues[0]}$</p>
            <p className="infoPriceRange__line">-</p>
            <p className="infoPriceRange__maxValue">{priceValues[1]}$</p>
          </div>
          <Slider
            className="filterBox__priceSlider"
            onChange={productsFiltering}
            ref={priceRef}
            value={priceValues}
            min={0}
            max={10000}
            step={10}
          />
        </div>
        <div className="categoryPage__productsFiltersBlock">
          <div className="categoryPage__products">
            {categoryData?.products &&
              categoryData.products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  category={product.category}
                  brand={product.brand}
                  color={product.color}
                  img={product.img}
                  price={product.price}
                  description={product.description}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
