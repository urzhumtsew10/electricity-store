import { useGetProductsQuery } from "../../api";

export default Products = () => {
  const { data } = useGetProductsQuery();
};
