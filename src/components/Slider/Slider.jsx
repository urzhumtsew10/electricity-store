import { useState } from "react";
import arrow from "../../img/arrow.svg";

import "./Slider.css";
import { SliderImg } from "./SliderImg";

export const Slider = ({ content }) => {
  const WIDTH_CONTENT = 0;

  const [offSet, setOffSet] = useState(WIDTH_CONTENT);

  const [classArrowNext, setClassArrowNext] = useState("active-arrow");
  const [classArrowPrev, setClassArrowPrev] = useState("");

  const nextContent = () => {
    if (offSet > -3681) {
      setOffSet(offSet - 1227);
    }
    if (offSet === -2454) {
      setClassArrowNext("");
    }
    if (offSet === 0) {
      setClassArrowPrev("active-arrow");
    }
  };

  const prevContent = () => {
    if (offSet <= -1227) {
      setOffSet(offSet + 1227);
    }
    if (offSet === -3681) {
      setClassArrowNext("active-arrow");
    }
    if (offSet === -1227) {
      setClassArrowPrev("");
    }
  };

  return (
    <div className="contentPage__slider">
      <div
        onClick={() => prevContent()}
        className={`slider__prevArrow ${classArrowPrev}`}
      >
        <img className="prevArrow__img" src={arrow} alt="arrow" />
      </div>
      <div className="slider__content">
        <div
          className="content__images"
          style={{ transform: `translateX(${offSet}px)` }}
        >
          {content.map(({ img, id }) => (
            <SliderImg key={id} img={img} />
          ))}
        </div>
      </div>
      <div
        onClick={() => nextContent()}
        className={`slider__nextArrow ${classArrowNext}`}
      >
        <img className="nextArrow__img" src={arrow} alt="arrow" />
      </div>
    </div>
  );
};
