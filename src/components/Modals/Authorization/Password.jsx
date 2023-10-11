import { useController } from "react-hook-form";

export const Password = ({ serverCheck }) => {
  const { field, fieldState } = useController({ name: "password" });
  const { error } = fieldState;

  const getPasswordTypeError = (error) => {
    if (error?.type) {
      switch (error.type) {
        case "min":
          return "length should be more 7";
        case "required":
          return "Password is required";
      }
    }
    if (serverCheck) {
      if (!serverCheck.data.password) {
        return "Password is wrong";
      }
    }

    return "";
  };

  const errorClass =
    serverCheck && !serverCheck.data.password ? "inputError" : "";

  return (
    <div className="authForm__inputShell">
      {<p className="textError">{getPasswordTypeError(error)}</p>}
      <input
        {...field}
        className={`authForm__input ${errorClass}`}
        type="text"
        placeholder="Password"
      />
    </div>
  );
};
