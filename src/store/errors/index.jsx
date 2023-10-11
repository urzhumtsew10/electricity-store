import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorEmailInput: "",
  errorEmailText: "",
  errorPasswordInput: "",
  errorPasswordText: "",
};

const errorsSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setEmailErrorInput: (state, action) => {
      return { ...state, errorEmailInput: action.payload.value };
    },
    setEmailErrorText: (state, action) => {
      return { ...state, errorEmailText: action.payload.value };
    },
    setPasswordErrorInput: (state, action) => {
      return { ...state, errorPasswordInput: action.payload.value };
    },
    setPasswordErrorText: (state, action) => {
      return { ...state, errorNameText: action.payload.value };
    },
  },
});

export const {
  setEmailErrorInput,
  setEmailErrorText,
  setPasswordErrorInput,
  setPasswordErrorText,
} = errorsSlice.actions;
export default errorsSlice.reducer;
