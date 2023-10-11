import { useController } from "react-hook-form";

export const Email = ({ serverCheck }) => {
  const { field, fieldState } = useController({ name: "email" });
  const { error } = fieldState;

  const getEmailTypeError = (error) => {
    if (error?.type) {
      switch (error.type) {
        case "email":
          return "Email is not valid";

        case "required":
          return "Email is required";
      }
    }
    if (serverCheck) {
      if (!serverCheck.data.email) {
        return "Email is used or isn't used";
      }
    }
    return "";
  };

  const errorClass = serverCheck && !serverCheck.data.email ? "inputError" : "";

  return (
    <div className="authForm__inputShell">
      {<p className="textError">{getEmailTypeError(error)}</p>}
      <input
        {...field}
        className={`authForm__input ${errorClass}`}
        type="text"
        placeholder="Email"
      />
    </div>
  );
};
