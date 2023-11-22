export const ItemFilter = ({ brand, openCategoryPage }) => {
  return (
    <li onClick={() => openCategoryPage(brand)} className="categoryList__item">
      {brand}
    </li>
  );
};
