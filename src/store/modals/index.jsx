import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  api: "https://electricity-store-api-2.vercel.app",
  editList: [
    { title: "Add New", isActive: false },
    { title: "Search", isActive: true },
  ],
  isLoading: false,
  authActive: false,
  electedActive: false,
  cartActive: false,
  userOffice: false,
  authForm: true,
  registerForm: false,
  orderForm: false,
  errorModal: { text: "", isActive: false },
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      return { ...state, isLoading: action.payload.value };
    },
    setOrderForm: (state, action) => {
      return { ...state, orderForm: action.payload.isActive };
    },
    setErrorModal: (state, action) => {
      return {
        ...state,
        errorModal: {
          text: action.payload.text,
          isActive: action.payload.isActive,
        },
      };
    },
    setActiveEditList: (state, action) => {
      const updateList = state.editList.map((item) => {
        if (item.title === action.payload.title) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      });
    },
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
  setIsLoading,
  setOrderForm,
  setErrorModal,
  setActiveEditList,
  setActiveRegisterForm,
  setActiveAuthForm,
  setActiveUserOffice,
  setActiveAuthModal,
  setActiveElectedModal,
  setActiveCartModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
