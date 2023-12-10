const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  categories: [],
  isSeeMore: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setIsSeeMore: (state, action) => {
      return { ...state, isSeeMore: action.payload.value };
    },
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

export const { setIsSeeMore, setCategories, addCategory } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
