import "../ErrorModal/ErrorModal.css";
import icon_error from "../../../img/icon-error.png";
import { useDispatch, useSelector } from "react-redux";
import { setErrorModal } from "../../../store/modals";

export const ErrorModal = () => {
  const dispatch = useDispatch();
  const errorModal = useSelector((state) => state.modals.errorModal);

  const closeErrorModal = () => {
    dispatch(setErrorModal({ text: "", isActive: false }));
  };

  return (
    <div className="errorModal">
      <div className="errorModal__modalContent">
        <img className="modalContent__img" src={icon_error} alt="error" />
        <p className="modalContent__text">{errorModal.text}</p>
        <button onClick={closeErrorModal} className="modalContent__btn">
          Ok
        </button>
      </div>
    </div>
  );
};
