import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../api";

export const FilterInput = ({ title, type, productsFiltering }) => {
  const { category } = useParams();
  const { data } = useGetProductsQuery();

  const countQuantity = () => {
    const correctCategory = category.split("-").join(" ");

    return data.filter(
      (product) =>
        product.category === correctCategory && product[type] === title
    ).length;
  };

  return (
    <div className="filterForm__inputDiv">
      <input
        onChange={() => productsFiltering()}
        id={title}
        className="inputDiv__checkbox"
        type="checkbox"
      />
      <label className="inputDiv__label" htmlFor={title}>
        {title}
      </label>
      <p className="inputDiv__counter">{countQuantity()}</p>
    </div>
  );
};
