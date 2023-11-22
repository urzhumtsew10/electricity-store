import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  electedProducts: [],
};

const electedProductsSlice = createSlice({
  name: "electedProducts",
  initialState,
  reducers: {
    setElectedProducts: (state, action) => {
      return { ...state, electedProducts: action.payload.value };
    },
  },
});

export const { setElectedProducts } = electedProductsSlice.actions;
export default electedProductsSlice.reducer;
