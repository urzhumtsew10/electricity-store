import { useSelector } from "react-redux";
import "../Editing/Editing.css";
import { EditButton } from "./EditButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ProductForm } from "./ProductForm";
import { CategoryForm } from "./CategoryForm";
import { ProductsEdit } from "./ProductsEdit";

export const Editing = () => {
  const editMenuList = useSelector((state) => state.modals.editList);

  const productSchema = yup.object().shape({
    category: yup
      .string()
      .required("Category is require")
      .min(4, "Should be min 4"),
    brand: yup.string().required("Brand is require"),
    description: yup.string().required("Description is require"),
    color: yup.string().required("Color is require").min(4, "Should be min 4"),
    price: yup.string().required("Price is require"),
  });

  const categorySchema = yup.object().shape({
    title: yup.string().required("Title is require").min(4, "Should be min 4"),
  });

  const formProductMethods = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      category: "",
      brand: "",
      description: "",
      color: "",
      price: "",
      img: "",
    },
  });

  const formCategoryMethods = useForm({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      title: "",
      img: "",
    },
  });

  return (
    <div className="userOffice__content contentEditing">
      {editMenuList[1].isActive && <ProductsEdit />}
      {editMenuList[0].isActive && (
        <ProductForm formProductMethods={formProductMethods} />
      )}
      <div className="contentEditing__editMenu">
        {editMenuList.map((item) => (
          <EditButton
            key={item.title}
            title={item.title}
            isActive={item.isActive}
          />
        ))}
      </div>
    </div>
  );
};
