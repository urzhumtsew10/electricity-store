import { useEffect } from "react";
import { useController } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setEmailError } from "../../../store/form";

export const Email = () => {
  const { field, fieldState } = useController({ name: "email" });
  const { error } = fieldState;

  const isActiveError = useSelector(
    (state) => state.formRegister.emailError.active
  );
  const errorText = useSelector((state) => state.formRegister.emailError.value);
  const dispatch = useDispatch();

  const getEmailTypeError = (error) => {
    if (error?.type) {
      switch (error.type) {
        case "email":
          return "Email is not valid";

        case "required":
          return "Email is required";
      }
    }
    return "";
  };

  useEffect(() => {
    dispatch(setEmailError({ value: getEmailTypeError(error) }));
  }, [error]);

  const errorClass = isActiveError ? "inputError" : "";

  return (
    <div className="authForm__inputShell">
      {<p className="textError">{errorText}</p>}
      <input
        {...field}
        className={`authForm__input ${errorClass}`}
        type="text"
        placeholder="Email"
      />
    </div>
  );
};
