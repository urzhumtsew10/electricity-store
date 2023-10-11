import { useGetCategoriesQuery } from "../../api";
import { CategoryCard } from "./CategoryCard/CategoryCard";
import "../Categories/Categories.css";

export const Categories = () => {
  const { data } = useGetCategoriesQuery();
  return (
    <div className="contentCategory">
      <h2 className="contentCategories__title">Categories</h2>
      <div className="contentCategories__categories">
        {data &&
          data
            .slice(0, 8)
            .map(({ title, id, img }) => (
              <CategoryCard key={id} title={title} img={img} />
            ))}
      </div>
      <button className="contentCategories__btn">See more</button>
    </div>
  );
};
