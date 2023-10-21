import { useDispatch } from "react-redux";
import { setActiveItemMenu } from "../../../../store/menuAccount";

export const MenuItem = ({ title, isActive }) => {
  const addedClass = isActive ? "active" : "";
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(setActiveItemMenu({ title: title }))}
      className={`menuOffice__item ${addedClass}`}
    >
      {title}
    </button>
  );
};
