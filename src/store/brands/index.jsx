import { createSlice } from "@reduxjs/toolkit";
import logo_apple from "../../img/logo-apple.svg";
import logo_samsung from "../../img/logo-samsung.svg";
import logo_vivo from "../../img/logo-vivo.svg";
import logo_acer from "../../img/logo-acer.svg";
import logo_hp from "../../img/logo-hp.svg";
import logo_xaomi from "../../img/logo-xaomi.svg";
import logo_asus from "../../img/logo-asus.svg";
import logo_msi from "../../img/logo-msi.svg";

const initialState = {
  brands: [
    { id: 1, img: logo_apple },
    { id: 2, img: logo_xaomi },
    { id: 3, img: logo_hp },
    { id: 4, img: logo_acer },
    { id: 5, img: logo_vivo },
    { id: 6, img: logo_samsung },
    { id: 7, img: logo_asus },
    { id: 8, img: logo_msi },
  ],
};

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    addBrand: (state, action) => {
      const lastId = state.brands[state.brands.length - 1].id;
      return {
        ...state,
        brands: [...state.brands, { id: lastId + 1, img: action.logo }],
      };
    },
    removeBrand: (state, action) => {
      const updateBrands = state.brands.filter(
        (brand) => brand.id !== action.id
      );
      return { ...state, brands: [...updateBrands] };
    },
  },
});

const { addBrand, removeBrand } = brandsSlice.actions;

export default brandsSlice.reducer;
