import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setAutorization,
  setEmailError,
  setPasswordError,
} from "../../../store/form";
import { setActiveAuthModal } from "../../../store/modals";
import { useCookies } from "react-cookie";

export const AuthorizationForm = ({
  activeAuth,
  activeAuthorizationForm,
  formAuthMethods,
}) => {
  const REST_API = useSelector((state) => state.modals.api);
  const { handleSubmit, register, reset } = formAuthMethods;
  const dispatch = useDispatch();

  const [cookies, setCookie] = useCookies(["token"]);

  const isActiveEmailError = useSelector(
    (state) => state.formRegister.emailError.active
  );
  const errorEmailText = useSelector(
    (state) => state.formRegister.emailError.value
  );

  const isActivePasswordError = useSelector(
    (state) => state.formRegister.passwordError.active
  );
  const errorPasswordText = useSelector(
    (state) => state.formRegister.passwordError.value
  );

  const tryAuthorizationUser = async (data) => {
    const response = await axios.post(`${REST_API}/user/auth`, data);

    if (!response.data.email) {
      dispatch(setEmailError({ value: "Email isn't used" }));
    } else {
      dispatch(setEmailError({ value: "" }));
    }
    if (!response.data.password) {
      dispatch(setPasswordError({ value: "Password is wrong" }));
    } else {
      dispatch(setPasswordError({ value: "" }));
    }

    if (response.data.email && response.data.password) {
      setCookie("token", response.data.userData.token, { maxAge: 8 * 60 * 60 });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: response.data.userData.id,
          name: response.data.userData.name,
          email: response.data.userData.email,
          role: response.data.userData.role,
        })
      );

      dispatch(setActiveAuthModal({ isActive: false }));
      dispatch(setAutorization({ isAuthorization: true }));
      document.body.style.overflow = "inherit";
      reset();
    }
  };

  const emailErrorClass = isActiveEmailError ? "inputError" : "";
  const passwordErrorClass = isActivePasswordError ? "inputError" : "";

  return (
    <div className={`authorization ${activeAuth}`}>
      <h2 className="contentAuthorization__title">Access by email</h2>
      <form
        onSubmit={handleSubmit(tryAuthorizationUser)}
        className="contentAuthorization__authForm"
        action="submit"
      >
        <div className="authForm__inputShell">
          {<p className="textError">{errorEmailText}</p>}
          <input
            {...register("email")}
            className={`authForm__input ${emailErrorClass}`}
            type="text"
            placeholder="Email"
          />
        </div>
        <div className="authForm__inputShell">
          {<p className="textError">{errorPasswordText}</p>}
          <input
            {...register("password")}
            className={`authForm__input ${passwordErrorClass}`}
            type="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="contentAuthorization__logIn">
          Log in
        </button>
      </form>
      <p
        onClick={() => activeAuthorizationForm()}
        className="contentAuthorization__signOn"
      >
        Sign on
      </p>
    </div>
  );
};
