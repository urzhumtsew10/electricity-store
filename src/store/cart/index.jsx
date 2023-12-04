import { createSlice } from "@reduxjs/toolkit";

const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));

const initialState = {
  cartProducts: cartProducts,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const currentProduct = state.cartProducts.filter(
        (product) => product.id === action.payload.id
      )[0];
      if (currentProduct) {
        currentProduct.counter += 1;
      } else {
        const product = {
          img: action.payload.img,
          category: action.payload.category,
          brand: action.payload.brand,
          color: action.payload.color,
          price: action.payload.price,
          counter: 1,
          id: action.payload.id,
        };
        return {
          ...state,
          cartProducts: [...state.cartProducts, { ...product }],
        };
      }
    },
    deleteProduct: (state, action) => {
      const updateCartProducts = state.cartProducts.filter(
        (product) => product.id !== action.payload.id
      );
      return { ...state, cartProducts: [...updateCartProducts] };
    },
    decrementQuantity: (state, action) => {
      const currentProduct = state.cartProducts.filter(
        (product) => product.id === action.payload.id
      )[0];
      if (currentProduct.counter > 1) {
        currentProduct.counter -= 1;
      }
    },
    incrementQuantity: (state, action) => {
      const currentProduct = state.cartProducts.filter(
        (product) => product.id === action.payload.id
      )[0];
      if (currentProduct.counter < 99) {
        currentProduct.counter += 1;
      }
    },
    removeAllProducts: (state, action) => {
      return { ...state, cartProducts: [] };
    },
  },
});

export const {
  addToCart,
  deleteProduct,
  decrementQuantity,
  incrementQuantity,
  removeAllProducts,
} = cartSlice.actions;
export default cartSlice.reducer;
