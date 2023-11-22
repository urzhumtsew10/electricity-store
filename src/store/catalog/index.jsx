import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catalogMenu: [
    {
      title: "Phones and Laptops",
      categories: ["phone", "laptop", "phone case", "laptop case"],
      isActive: true,
    },
    {
      title: "Headphones and watches",
      categories: ["headphones", "watch"],
      isActive: false,
    },
    {
      title: "Personal computer",
      categories: [
        "personal computer",
        "monitor",
        "keyboard",
        "mouse",
        "game console",
        "gamepad",
      ],
      isActive: false,
    },
    {
      title: "Household appliances",
      categories: [
        "washing machine",
        "conditioning",
        "fridge",
        "kettle",
        "iron",
        "boiler",
        "vacuum cleaner",
        "hairdryer",
      ],
      isActive: false,
    },
  ],
  catalogFilter: { category: "", brand: "" },
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setCatalogFilter: (state, action) => {
      return {
        ...state,
        catalogFilter: {
          category: action.payload.category,
          brand: action.payload.brand,
        },
      };
    },
    setActiveSubMenu: (state, action) => {
      const upadatedCatalogMenu = state.catalogMenu.map((item) => {
        if (item.title === action.payload.title) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      });
    },
  },
});

export const { setActiveSubMenu, setCatalogFilter } = catalogSlice.actions;
export default catalogSlice.reducer;
