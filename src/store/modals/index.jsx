import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authActive: false,
  electedActive: false,
  cartActive: false,
  userOffice: false,
  authForm: true,
  registerForm: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setActiveUserOffice: (state, action) => {
      return { ...state, userOffice: action.payload.isActive };
    },
    setActiveAuthForm: (state, action) => {
      return { ...state, authForm: action.payload.isActive };
    },
    setActiveRegisterForm: (state, action) => {
      return { ...state, registerForm: action.payload.isActive };
    },
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

export const {
  setActiveRegisterForm,
  setActiveAuthForm,
  setActiveUserOffice,
  setActiveAuthModal,
  setActiveElectedModal,
  setActiveCartModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
