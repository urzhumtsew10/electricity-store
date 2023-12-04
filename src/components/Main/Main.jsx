import { SliderImages } from "../SliderImages/SliderImages";
import { Products } from "../Products/Products";
import { Categories } from "../Categories/Categories";
import { Brands } from "../Brands/Brands";
import banner_01 from "../../img/banner-01.jpg";
import banner_02 from "../../img/banner_02.png";
import banner_03 from "../../img/banner_03.png";
import "../Main/reset.css";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../store/categories";
import axios from "axios";
import { useEffect } from "react";

export const Main = () => {
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
      <Categories />
      <Products />
      <SliderImages
        content={[
          { id: 5, img: banner_02 },
          { id: 6, img: banner_02 },
          { id: 7, img: banner_02 },
          { id: 8, img: banner_02 },
        ]}
      />
      <Brands />
    </>
  );
};
