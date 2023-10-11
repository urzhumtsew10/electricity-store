import { useController } from "react-hook-form";

const getNameTypeError = (type) => {
  switch (type) {
    case "min":
      return "length should be more 3";
    case "required":
      return "Name is required";
  }
};

export const Name = () => {
  const { field, fieldState } = useController({ name: "name" });
  const { error } = fieldState;
  return (
    <div className="authForm__inputShell">
      {error?.type && (
        <p className="textError">{getNameTypeError(error.type)}</p>
      )}
      <input
        {...field}
        className="authForm__input"
        type="text"
        placeholder="Name"
      />
    </div>
  );
};
