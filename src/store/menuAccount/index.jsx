import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuList: [],
  userItems: [
    { title: "Your profile", isActive: true },
    { title: "Your orders", isActive: false },
  ],
  adminItems: [{ title: "Editing", isActive: false }],
};

const menuAccountSlice = createSlice({
  name: "menuAccount",
  initialState,
  reducers: {
    setActiveItemMenu: (state, action) => {
      const newMenuItems = state.menuList.map((item) => {
        if (item.title === action.payload.title) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      });
    },

    generateMenuList: (state, action) => {
      if (action.payload.role === "user") {
        console.log("user part");
        return { ...state, menuList: [...state.userItems] };
      }
      if (action.payload.role === "admin") {
        console.log("admin part");
        return {
          ...state,
          menuList: [...state.userItems, ...state.adminItems],
        };
      }
    },
  },
});

export const { setActiveItemMenu, generateMenuList } = menuAccountSlice.actions;

export default menuAccountSlice.reducer;
