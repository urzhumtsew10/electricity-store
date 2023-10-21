import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailError: { value: "", active: false },
  passwordError: { value: "", active: false },
  nameError: { value: "", active: false },

  isAuthorization: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setAutorization: (state, action) => {
      return { ...state, isAuthorization: action.payload.isAuthorization };
    },
    setEmailError: (state, action) => {
      const active = action.payload.value ? true : false;
      return {
        ...state,
        emailError: { value: action.payload.value, active: active },
      };
    },
    setPasswordError: (state, action) => {
      const active = action.payload.value ? true : false;
      return {
        ...state,
        passwordError: { value: action.payload.value, active: active },
      };
    },
    setNameError: (state, action) => {
      const active = action.payload.value ? true : false;
      return {
        ...state,
        nameError: { value: action.payload.value, active: active },
      };
    },
    resetValues: (state, action) => {
      return {
        ...state,
        emailValue: "",
        passwordValue: "",
        nameValue: "",
      };
    },
    resetErrors: (state, action) => {
      return {
        ...state,
        emailError: { value: "", active: false },
        passwordError: { value: "", active: false },
        nameError: { value: "", active: false },
      };
    },
  },
});

export const {
  setAutorization,
  setEmailError,
  setPasswordError,
  setNameError,
  resetValues,
  resetErrors,
} = formSlice.actions;
export default formSlice.reducer;
