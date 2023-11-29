import { configureStore } from "@reduxjs/toolkit";
import { cartSlice, productsSlice } from "./slice";

const redux = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default redux;
