import { useDispatch } from "react-redux";
import { setActiveSubMenu } from "../../store/catalog";

export const ItemMenu = ({ title, isActive }) => {
  const dispatch = useDispatch();
  const openSubMenu = () => {
    dispatch(setActiveSubMenu({ title: title }));
  };

  const addedClass = isActive ? "active" : "";

  return (
    <p onClick={openSubMenu} className={`catalogContent__item ${addedClass}`}>
      {title}
    </p>
  );
};
