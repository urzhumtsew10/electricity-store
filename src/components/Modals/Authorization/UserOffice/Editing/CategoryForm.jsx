import { useRef, useState } from "react";
import { EditInput } from "./EditInput";
import { useDispatch, useSelector } from "react-redux";
import { setErrorModal } from "../../../../../store/modals";
import axios from "axios";
import { useLazyGetCategoriesQuery } from "../../../../../api";

export const CategoryForm = ({ formCategoryMethods }) => {
  const REST_API = useSelector((state) => state.modals.api);

  const inputRef = useRef(null);
  const [inputFile, setInputFile] = useState("");
  const [fetchCategories] = useLazyGetCategoriesQuery();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = formCategoryMethods;

  const tryAddNewCategory = async (data) => {
    console.log(Boolean(inputFile));
    if (inputFile) {
      try {
        data.img = inputFile;
        data.title = data.title =
          data.title[0].toUpperCase() +
          data.title.slice(1, data.title.length).toLowerCase();
        const response = await axios.post(`${REST_API}/categories`, data);
        fetchCategories();
      } catch {
        dispatch(
          setErrorModal({ text: "The photo weighs too much", isActive: true })
        );
      } finally {
        reset();
        setInputFile("");
      }
    }
  };

  const addFile = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };

  const changeFile = (event) => {
    const img = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setInputFile(event.target.result);
    };
    reader.readAsDataURL(img);
  };

  return (
    <form
      onSubmit={handleSubmit(tryAddNewCategory)}
      className="contentEditing__formEditProduct"
      action="submit"
    >
      <EditInput name="title" register={register} errors={errors} />
      <input
        {...register("img")}
        className="formEditProduct__inputFile"
        ref={inputRef}
        onChange={changeFile}
        type="file"
      />
      <div className="formEditProduct__buttonBox">
        <button onClick={addFile} className="formEditProduct__downloadImg">
          Add File
        </button>
        <button type="submit" className="formEditProduct__buttonSubmit">
          Submit
        </button>
      </div>

      <div className="formEditProduct__imgPreview">
        {!inputFile && <p className="boxInput__textError">Img is require</p>}
        {inputFile && (
          <img className="imgPreview__img" src={inputFile} alt="product__img" />
        )}
      </div>
    </form>
  );
};
