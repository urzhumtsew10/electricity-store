import "../CatalogMobile/CatalogMobile.css";
import icon_arrow from "../../img/arrow.svg";
import { Catalog } from "../Catalog/Catalog";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ItemMenu } from "../Catalog/ItemMenu";
import { CatalogFilter } from "../Catalog/CatalogFilter";

export const CatalogMobile = () => {
  const [catalogContent, setCatalogContent] = useState([]);
  const catalogMenu = useSelector((state) => state.catalog.catalogMenu);

  useEffect(() => {
    const activeItem = catalogMenu.filter((item) => item.isActive)[0];
    setCatalogContent(activeItem);
  }, [catalogMenu]);

  const goBackHome = () => {
    window.history.back();
  };

  return (
    <div className="catalogMobile">
      <img
        onClick={goBackHome}
        className="catalogMobile__arrow"
        src={icon_arrow}
        alt="arrow"
      />
      <p onClick={goBackHome} className="catalogMobile__text">
        Back
      </p>
      <div className="catalogMobile__catalogBlock">
        <div className="catalogBlock__catalogContent">
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
    </div>
  );
};
