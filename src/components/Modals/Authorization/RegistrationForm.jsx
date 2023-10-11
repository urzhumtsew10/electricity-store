import { Email } from "../Authorization/Email";
import { Password } from "../Authorization/Password";
import { Name } from "../Authorization/Name";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

const userRegisterSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  name: yup.string().min(4),
});

export const RegistrationForm = ({ activeReg, activeRegistrationForm }) => {
  const formRegisterMethods = useForm({
    resolver: yupResolver(userRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = formRegisterMethods;

  const [serverCheck, setServerCheck] = useState(false);

  const tryRegisterUser = async (data) => {
    const response = await axios.post(
      "http://localhost:3030/user/register",
      data
    );
    setServerCheck(response);
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
          <Email serverCheck={serverCheck} />
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
