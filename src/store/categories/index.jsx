const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const lastId = state.categories[state.categories.length - 1].id;

      return {
        ...state,
        categories: [
          ...state.categories,
          {
            id: lastId + 1,
            title: action.title,
            img: action.img,
          },
        ],
      };
    },
    removeCategories: (state, action) => {
      const upadateCategories = state.categories.filter(
        (category) => category.id !== action.id
      );
    },
  },
});

export const { addCategory, removeCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
