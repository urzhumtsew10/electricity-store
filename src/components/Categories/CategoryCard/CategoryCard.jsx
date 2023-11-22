import { useNavigate } from "react-router-dom";
import "./CategoryCard.css";

export const CategoryCard = ({ id, title, img }) => {
  const categoryImg = img.length > 50 ? img : require(`../../../img/${img}`);

  const navigate = useNavigate();

  const openCategoryPage = () => {
    const nameCategory = title.toLowerCase().split(" ").join("-");
    navigate(`/category/${nameCategory}`);
  };

  return (
    <div onClick={openCategoryPage} className="categories__category">
      <img className="category__img" src={categoryImg} />
      <h2 className="category__title">{title}</h2>
    </div>
  );
};
