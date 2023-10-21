import { useEffect } from "react";
import { useController } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setPasswordError } from "../../../store/form";

export const Password = () => {
  const isActiveError = useSelector(
    (state) => state.formRegister.passwordError.active
  );
  const errorText = useSelector(
    (state) => state.formRegister.passwordError.value
  );
  const { field, fieldState } = useController({ name: "password" });
  const { error } = fieldState;

  const dispatch = useDispatch();

  const getPasswordTypeError = (error) => {
    if (error?.type) {
      switch (error.type) {
        case "required":
          return "Password is required";
        case "min":
          return "length should be more 7";
      }
    }
    return "";
  };

  useEffect(() => {
    dispatch(setPasswordError({ value: getPasswordTypeError(error) }));
  }, [error]);

  const errorClass = isActiveError ? "inputError" : "";

  return (
    <div className="authForm__inputShell">
      {<p className="textError">{errorText}</p>}
      <input
        {...field}
        className={`authForm__input ${errorClass}`}
        type="password"
        placeholder="Password"
      />
    </div>
  );
};
