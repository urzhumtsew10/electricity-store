import { Email } from "./Email";
import { Password } from "./Password";
import { Name } from "./Name";
import { FormProvider } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAutorization, setEmailError } from "../../../store/form";
import {
  setActiveAuthModal,
  setActiveRegisterForm,
} from "../../../store/modals";
import { useCookies } from "react-cookie";

export const RegistrationForm = ({
  activeReg,
  activeRegistrationForm,
  formRegisterMethods,
}) => {
  const dispatch = useDispatch();
  const { handleSubmit, reset } = formRegisterMethods;
  const [cookies, setCookie] = useCookies(["token"]);

  const tryRegisterUser = async (data) => {
    const response = await axios.post(
      "http://localhost:3030/user/register",
      data
    );
    if (!response.data.email) {
      dispatch(setEmailError({ value: "Email is used" }));
    } else {
      dispatch(setEmailError({ value: "" }));
    }

    if (response.data.email && response.data.password) {
      setCookie("token", response.data.token, { maxAge: 8 * 60 * 60 });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
        })
      );

      dispatch(setActiveRegisterForm({ isActive: false }));
      dispatch(setActiveAuthModal({ isActive: false }));
      dispatch(setAutorization({ isAuthorization: true }));
      document.body.style.overflow = "inherit";
      reset();
    }
  };

  return (
    <div className={`registration ${activeReg}`}>
      <h2 className="contentAuthorization__title">Registration</h2>
      <FormProvider {...formRegisterMethods}>
        <form
          onSubmit={handleSubmit(tryRegisterUser)}
          className="contentAuthorization__authForm registrationForm"
          action="submit"
        >
          <Name />
          <Email />
          <Password />
          <button type="submit" className="contentAuthorization__logIn">
            Sign on
          </button>
        </form>
      </FormProvider>
      <p
        onClick={() => activeRegistrationForm()}
        className="contentAuthorization__signOn"
      >
        Log in
      </p>
    </div>
  );
};
