import { useNavigate } from "react-router-dom";
import "./CategoryCard.css";

export const CategoryCard = ({ _id, title, img }) => {
  const navigate = useNavigate();

  const openCategoryPage = () => {
    const nameCategory = title.toLowerCase().split(" ").join("-");
    navigate(`/category/${nameCategory}`);
  };

  return (
    <div onClick={openCategoryPage} className="categories__category">
      <img className="category__img" src={img} />
      <h2 className="category__title">{title}</h2>
    </div>
  );
};
