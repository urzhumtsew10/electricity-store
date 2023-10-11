import "./CategoryCard.css";

export const CategoryCard = ({ id, title, img }) => {
  return (
    <div className="categories__category">
      <img className="category__img" src={require(`../../../img/${img}`)} />
      <h2 className="category__title">{title}</h2>
    </div>
  );
};
