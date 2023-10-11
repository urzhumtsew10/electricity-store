import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const lastId = state.products[state.products.length - 1].id;
      return {
        ...state,
        products: [
          ...state.products,
          {
            id: lastId + 1,
            category: action.category,
            description: action.description,
            brand: action.brand,
            color: action.color,
            price: action.price,
            img: action.img,
          },
        ],
      };
    },

    removeProduct: (state, action) => {
      const updateProducts = state.products.filter(
        (product) => product.id !== action.id
      );
      return { ...state, products: [...updateProducts] };
    },
  },
});

const { addProduct, removeProduct } = productsSlice.actions;

export default productsSlice.reducer;
