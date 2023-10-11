import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authActive: false,
  electedActive: false,
  cartActive: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setActiveAuthModal: (state, action) => {
      return { ...state, authActive: action.payload.isActive };
    },
    setActiveElectedModal: (state, action) => {
      return { ...state, electedActive: action.payload.isActive };
    },
    setActiveCartModal: (state, action) => {
      return { ...state, cartActive: action.payload.isActive };
    },
  },
});

export const { setActiveAuthModal, setActiveElectedModal, setActiveCartModal } =
  modalsSlice.actions;

export default modalsSlice.reducer;
