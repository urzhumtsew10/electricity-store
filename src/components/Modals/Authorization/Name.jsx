import { useEffect } from "react";
import { useController } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setNameError } from "../../../store/form";

export const Name = () => {
  const { field, fieldState } = useController({ name: "name" });
  const { error } = fieldState;
  const dispatch = useDispatch();

  const isActiveError = useSelector(
    (state) => state.formRegister.nameError.active
  );
  const errorText = useSelector((state) => state.formRegister.nameError.value);

  const getNameTypeError = (error) => {
    if (error && error?.type) {
      switch (error.type) {
        case "min":
          return "length should be more 3";
        case "required":
          return "Name is required";
      }
    }
  };

  useEffect(() => {
    dispatch(setNameError({ value: getNameTypeError(error) }));
  }, [error]);

  const errorClass = isActiveError ? "inputError" : "";
  return (
    <div className="authForm__inputShell">
      {<p className="textError">{errorText}</p>}
      <input
        {...field}
        className={`authForm__input ${errorClass}`}
        type="text"
        placeholder="Name"
      />
    </div>
  );
};
