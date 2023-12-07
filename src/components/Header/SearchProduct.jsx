import { useNavigate } from "react-router-dom";

export const SearchProduct = ({
  id,
  img,
  category,
  brand,
  color,
  description,
  price,
  closeSearchProducts,
}) => {
  const title = `${category} ${brand} ${color} ${description}`;
  const navigate = useNavigate();

  const openProductPage = () => {
    closeSearchProducts();
    navigate(`/product/${id}`);
  };

  return (
    <div onClick={openProductPage} className="searchProducts__searchProduct">
      <img className="searchProduct__img" src={img} alt="img" />
      <p className="searchProduct__title">{title}</p>
      <p className="searchProduct__price">{price}$</p>
    </div>
  );
};
