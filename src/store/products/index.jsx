import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  currentProduct: {},
  isSeeMore: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setIsSeeMore: (state, action) => {
      return { ...state, isSeeMore: action.payload.value };
    },
    setCurrentProduct: (state, action) => {
      return { ...state, currentProduct: action.payload.value };
    },
    setProducts: (state, action) => {
      return { ...state, products: action.payload.value };
    },
    addProduct: (state, action) => {
      return { ...state, products: [...state.products, action.payload.value] };
    },
    removeProduct: (state, action) => {
      const updateProducts = state.products.filter(
        (product) => product._id !== action.payload.id
      );
      return { ...state, products: updateProducts };
    },
  },
});

export const {
  setIsSeeMore,
  setProducts,
  setCurrentProduct,
  addProduct,
  removeProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
