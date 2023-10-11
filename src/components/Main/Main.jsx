import { Slider } from "../Slider/Slider";
import { Products } from "../Products/Products";
import { Categories } from "../Categories/Categories";
import { Brands } from "../Brands/Brands";
import banner_01 from "../../img/banner-01.jpg";
import banner_02 from "../../img/banner_02.png";
import banner_03 from "../../img/banner_03.png";
import "../Main/reset.css";

export const Main = () => {
  return (
    <>
      <Slider
        content={[
          { id: 1, img: banner_03 },
          { id: 2, img: banner_01 },
          { id: 3, img: banner_03 },
          { id: 4, img: banner_01 },
        ]}
      />
      <Categories />
      <Products />
      <Slider
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
