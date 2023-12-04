const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      return { ...state, categories: action.payload.value };
    },
    addCategory: (state, action) => {
      return {
        ...state,
        categories: [...state.categories, action.payload.value],
      };
    },
  },
});

export const { setCategories, addCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
