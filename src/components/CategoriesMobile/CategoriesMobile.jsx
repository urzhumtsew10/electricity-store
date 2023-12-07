import "../CategoriesMobile/CategoriesMobile.css";
import icon_arrow from "../../img/arrow.svg";
import { useSelector } from "react-redux";
import { CategoryCard } from "../Categories/CategoryCard/CategoryCard";

export const CategoriesMobile = () => {
  const categories = useSelector((state) => state.categories.categories);

  const goBackHome = () => {
    window.history.back();
  };

  return (
    <div className="categoriesMobile">
      <img
        onClick={goBackHome}
        className="categoriesMobile__arrow"
        src={icon_arrow}
        alt="arrow"
      />
      <p onClick={goBackHome} className="categoriesMobile__text">
        Back
      </p>
      <div className="categoriesMobile__categories">
        {categories &&
          categories.map(({ title, _id, img }) => (
            <CategoryCard key={_id} title={title} img={img} />
          ))}
      </div>
    </div>
  );
};
