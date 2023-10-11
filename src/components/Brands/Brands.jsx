import { useSelector } from "react-redux";
import { BrandCard } from "./BrandCard/BrandCard";
import "../Brands/Brands.css";

export const Brands = () => {
  const brands = useSelector((state) => state.brands.brands);
  return (
    <div className="brandsBlock">
      <h2 className="brandsBlock__title">Brands</h2>
      <div className="brandsBlock__brands">
        {brands.map(({ id, img }) => (
          <BrandCard key={id} img={img} />
        ))}
      </div>
    </div>
  );
};
