import { useRef, useState } from "react";
import { EditInput } from "./EditInput";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setErrorModal } from "../../../../../store/modals";
import { setProducts } from "../../../../../store/products";

export const ProductForm = ({ formProductMethods }) => {
  const REST_API = useSelector((state) => state.modals.api);
  const currentProduct = useSelector((state) => state.products.currentProduct);

  const correctionData = (data) => {
    data.category = data.category.toLocaleLowerCase();
    data.brand = data.brand =
      data.brand[0].toUpperCase() +
      data.brand.slice(1, data.brand.length).toLowerCase();
    data.color = data.color.toLocaleLowerCase();
    data.description = data.description.toLocaleLowerCase();
    data.price = +data.price;
  };

  const inputRef = useRef(null);
  const [inputFile, setInputFile] = useState("");

  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = formProductMethods;

  const tryAddNewProduct = async (data) => {
    try {
      data.img = inputFile;
      correctionData(data);
      const response = await axios.post(`${REST_API}/products`, data);
      dispatch(setProducts({ value: response.data }));
    } catch {
      dispatch(
        setErrorModal({ text: "The photo weighs too much", isActive: true })
      );
    } finally {
      reset();
      setInputFile("");
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
      onSubmit={handleSubmit(tryAddNewProduct)}
      className="contentEditing__formEditProduct"
      action="submit"
    >
      <EditInput name="category" register={register} errors={errors} />
      <EditInput name="brand" register={register} errors={errors} />
      <EditInput name="description" register={register} errors={errors} />
      <EditInput name="color" register={register} errors={errors} />
      <EditInput name="price" register={register} errors={errors} />
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
