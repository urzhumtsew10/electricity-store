import { Email } from "../Authorization/Email";
import { Password } from "../Authorization/Password";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider, useController } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmailErrorText } from "../../../store/errors";

export const AuthorizationForm = ({ activeAuth, activeAuthorizationForm }) => {
  const errorEmailText = useSelector((state) => state.errors.errorEmailText);
  const dispatch = useDispatch();

  const userAuthSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });

  const formAuthMethods = useForm({
    resolver: yupResolver(userAuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = formAuthMethods;

  const [serverCheck, setServerCheck] = useState(false);

  const tryAuthorizationUser = async (data) => {
    const response = await axios.post("http://localhost:3030/user/auth", data);
    setServerCheck(response);
  };

  return (
    <div className={`authorization ${activeAuth}`}>
      <h2 className="contentAuthorization__title">Access by email</h2>
      <FormProvider {...formAuthMethods}>
        <form
          onSubmit={handleSubmit(tryAuthorizationUser)}
          className="contentAuthorization__authForm"
          action="submit"
        >
          <Email serverCheck={serverCheck} />
          <Password serverCheck={serverCheck} />
          <button type="submit" className="contentAuthorization__logIn">
            Log in
          </button>
        </form>
      </FormProvider>
      <p
        onClick={() => activeAuthorizationForm()}
        className="contentAuthorization__signOn"
      >
        Sign on
      </p>
    </div>
  );
};
