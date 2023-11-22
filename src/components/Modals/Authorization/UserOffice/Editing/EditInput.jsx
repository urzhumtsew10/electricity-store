export const EditInput = ({ name, register, errors }) => {
  const activeClass = errors[`${name}`]?.message ? "active" : "";

  return (
    <div className={`formEditProduct__boxInput ${activeClass}`}>
      <p className="boxInput__textError">{errors[`${name}`]?.message}</p>
      <input
        {...register(`${name}`)}
        className="formEditProduct__input"
        type="text"
        placeholder={name}
      />
    </div>
  );
};
