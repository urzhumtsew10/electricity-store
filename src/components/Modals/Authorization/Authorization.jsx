import { useDispatch, useSelector } from "react-redux";
import "./Authorization.css";
import {
  setActiveAuthForm,
  setActiveAuthModal,
  setActiveRegisterForm,
} from "../../../store/modals";
import icon_close from "../../../img/icon-close.svg";
import { RegistrationForm } from "./RegistrationForm";
import { AuthorizationForm } from "./AuthorizationForm";
import { resetErrors } from "../../../store/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserOffice } from "./UserOffice/UserOffice";

export const Authorization = () => {
  const activeWindow = useSelector((state) => state.modals.authActive);
  const activeAuthForm = useSelector((state) => state.modals.authForm);
  const activeRegisterForm = useSelector((state) => state.modals.registerForm);
  const activeOffice = useSelector((state) => state.modals.userOffice);

  const dispatch = useDispatch();

  const resetForms = () => {
    dispatch(resetErrors());
    resetRegister();
    resetAuth();
  };

  const closeAuthModal = () => {
    dispatch(setActiveAuthModal({ isActive: false }));
    document.body.style.overflow = "inherit";
    resetForms();
  };

  const activeRegistrationForm = () => {
    dispatch(setActiveRegisterForm({ isActive: false }));
    dispatch(setActiveAuthForm({ isActive: true }));

    resetForms();
  };

  const activeAuthorizationForm = () => {
    dispatch(setActiveRegisterForm({ isActive: true }));
    dispatch(setActiveAuthForm({ isActive: false }));
    resetForms();
  };

  const userRegisterSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
    name: yup.string().required().min(4),
  });

  const formRegisterMethods = useForm({
    resolver: yupResolver(userRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const resetRegister = formRegisterMethods.reset;

  const formAuthMethods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const resetAuth = formAuthMethods.reset;

  const activeAuthClass = activeAuthForm ? "active-content" : "";
  const activeRegisterClass = activeRegisterForm ? "active-content" : "";
  const activeOfficeClass = activeOffice ? "active-content" : "";
  const windowClass = activeWindow ? "active" : "";
  return (
    <div className={`windowAuthorization ${windowClass}`}>
      <div className={`contentAuthorization ${windowClass}`}>
        <img
          onClick={closeAuthModal}
          className="contentAuthorization__img"
          src={icon_close}
        />
        {activeOffice && <UserOffice activeOffice={activeOfficeClass} />}
        <AuthorizationForm
          formAuthMethods={formAuthMethods}
          activeAuth={activeAuthClass}
          activeAuthorizationForm={activeAuthorizationForm}
        />
        <RegistrationForm
          formRegisterMethods={formRegisterMethods}
          activeReg={activeRegisterClass}
          activeRegistrationForm={activeRegistrationForm}
        />
      </div>
    </div>
  );
};
