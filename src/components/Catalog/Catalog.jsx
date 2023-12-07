import { useEffect, useState } from "react";
import "../Catalog/Catalog.css";
import { ItemMenu } from "./ItemMenu";
import { useDispatch, useSelector } from "react-redux";
import { CatalogFilter } from "./CatalogFilter";
import axios from "axios";
import { setProducts } from "../../store/products";

export const Catalog = () => {
  const [catalogContent, setCatalogContent] = useState([]);
  const catalogMenu = useSelector((state) => state.catalog.catalogMenu);
  const dispatch = useDispatch();
  const REST_API = useSelector((state) => state.modals.api);

  useEffect(() => {
    axios.get(`${REST_API}/products`).then((res) => {
      dispatch(setProducts({ value: res.data }));
    });
  }, []);

  useEffect(() => {
    const activeItem = catalogMenu.filter((item) => item.isActive)[0];
    setCatalogContent(activeItem);
  }, [catalogMenu]);

  return (
    <div className="header__catalogBlock">
      <div className="header__catalogContent">
        <div className="catalogContent__menu">
          {catalogMenu.map((item) => (
            <ItemMenu
              key={item.title}
              title={item.title}
              isActive={item.isActive}
            />
          ))}
        </div>
        <div className="catalogContent__content">
          {catalogContent?.categories &&
            catalogContent.categories.map((item) => (
              <CatalogFilter key={item} title={item} />
            ))}
        </div>
      </div>
    </div>
  );
};
