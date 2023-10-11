import { useDispatch, useSelector } from "react-redux";
import "../Authorization/Authorization.css";
import { setActiveAuthModal } from "../../../store/modals";
import icon_close from "../../../img/icon-close.svg";
import { useState } from "react";
import { RegistrationForm } from "./RegistrationForm";
import { AuthorizationForm } from "./AuthorizationForm";
import { setEmailErrorInput } from "../../../store/errors";

export const Authorization = () => {
  const [isActiveAuth, setActiveAuth] = useState(false);

  const active = useSelector((state) => state.modals.authActive);
  const dispatch = useDispatch();

  const closeAuthModal = () => {
    dispatch(setActiveAuthModal({ isActive: false }));
  };

  const activeRegistrationForm = () => {
    setActiveAuth(false);
  };

  const activeAuthorizationForm = () => {
    setActiveAuth(true);
  };

  const activeAuth = !isActiveAuth ? "active-form" : "";
  const activeReg = isActiveAuth ? "active-form" : "";
  const activeWindow = active ? "active" : "";
  return (
    <div className={`windowAuthorization ${activeWindow}`}>
      <div className={`contentAuthorization ${activeWindow}`}>
        <img
          onClick={closeAuthModal}
          className="contentAuthorization__img"
          src={icon_close}
        />
        <AuthorizationForm
          activeAuth={activeAuth}
          activeAuthorizationForm={activeAuthorizationForm}
        />
        <RegistrationForm
          activeReg={activeReg}
          activeRegistrationForm={activeRegistrationForm}
        />
      </div>
    </div>
  );
};
