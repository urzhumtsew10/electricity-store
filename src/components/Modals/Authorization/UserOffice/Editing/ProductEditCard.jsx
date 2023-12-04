import icon_trash from "../../../../../img/icon-trash.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../../../../store/products";

export const ProductEditCard = ({ id, img, category, brand, color, price }) => {
  const REST_API = useSelector((state) => state.modals.api);
  const dispatch = useDispatch();

  const deleteProduct = async () => {
    const response = await axios.delete(`${REST_API}/products/${id}`);
    dispatch(setProducts({ value: response.data }));
  };

  return (
    <div className="products__editProduct">
      <img className="editProduct__img" src={img} alt="img product" />
      <p className="editProduct__infoProduct">
        {category} {brand} {color}
      </p>
      <p className="editProduct__price">{price}$</p>
      <div className="editProduct__actions">
        <div onClick={deleteProduct} className="actions__actionDelete">
          <img className="iconDelete__img" src={icon_trash} alt="icon" />
        </div>
      </div>
    </div>
  );
};
