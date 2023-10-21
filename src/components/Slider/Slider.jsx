import { useEffect, useRef, useState } from "react";
import arrow from "../../img/arrow.svg";

import "./Slider.css";
import { SliderImg } from "./SliderImg";

export const Slider = ({ content }) => {
  const refSlider = useRef(0);
  const [offSet, setOffSet] = useState(0);

  const WINDOW_WIDTH = window.screen.width;

  const [classArrowNext, setClassArrowNext] = useState("active-arrow");
  const [classArrowPrev, setClassArrowPrev] = useState("");

  const nextContent = () => {
    const widthImg = refSlider.current.getBoundingClientRect().width;
    const width = WINDOW_WIDTH >= 1500 ? widthImg - 3 : widthImg + 3;
    if (offSet > -(width * 3)) {
      setOffSet(offSet - width);
    }
    if (offSet === -(width * 2)) {
      setClassArrowNext("");
    }
    if (offSet === 0) {
      setClassArrowPrev("active-arrow");
    }
  };

  const prevContent = () => {
    const widthImg = refSlider.current.getBoundingClientRect().width;
    const width = WINDOW_WIDTH >= 1530 ? widthImg - 3 : widthImg + 3;

    if (offSet <= -width) {
      setOffSet(offSet + width);
    }
    if (offSet === -(width * 3)) {
      setClassArrowNext("active-arrow");
    }
    if (offSet === -width) {
      setClassArrowPrev("");
    }
  };

  return (
    <div className="contentPage__slider">
      <div
        onClick={prevContent}
        className={`slider__prevArrow ${classArrowPrev}`}
      >
        <img className="prevArrow__img" src={arrow} alt="arrow" />
      </div>
      <div className="slider__content">
        <div
          ref={refSlider}
          className="content__images"
          style={{ transform: `translateX(${offSet}px)` }}
        >
          {content.map(({ img, id }) => (
            <SliderImg key={id} img={img} />
          ))}
        </div>
      </div>
      <div
        onClick={nextContent}
        className={`slider__nextArrow ${classArrowNext}`}
      >
        <img className="nextArrow__img" src={arrow} alt="arrow" />
      </div>
    </div>
  );
};
