import { useDispatch } from "react-redux";
import { setActiveEditList } from "../../../../../store/modals";

export const EditButton = ({ title, isActive }) => {
  const dispatch = useDispatch();
  const activeClass = isActive ? "active" : "";

  const openEditForm = () => {
    dispatch(setActiveEditList({ title: title }));
  };

  return (
    <button
      onClick={openEditForm}
      className={`editMenu__menuButton ${activeClass}`}
    >
      {title}
    </button>
  );
};
