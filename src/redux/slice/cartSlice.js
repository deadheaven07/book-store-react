import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const localStorageCartKey = "_local_cart_";

const loadCartFromLocalStorage = () => {
  try {
    const cartData = localStorage.getItem(localStorageCartKey);
    return cartData ? JSON.parse(cartData) : { items: [], totalQuantity: 0 };
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return { items: [], totalQuantity: 0 };
  }
};

const saveCartToLocalStorage = (cart) => {
  try {
    const cartData = JSON.stringify(cart);
    localStorage.setItem(localStorageCartKey, cartData);
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addItemToCart(state, action) {
      const newBook = action.payload;
      const existingBook = state.items.find(
        (item) =>
          item.id.toString().toLowerCase() ===
          newBook.id.toString().toLowerCase()
      );

      // console.log(existingItem.quantity);

      if (existingBook && existingBook.quantity) {
        // console.log("Control reached");
        // console.log(existingItem.quantity, existingItem.maxQuantity);
        if (existingBook.quantity < existingBook.maxQuantity) {
          // console.log("Control reached here");
          existingBook.quantity += 1;
          state.totalQuantity += 1;
        } else {
          toast.dismiss();
          toast.error(`Max Quantity: ${existingBook.maxQuantity}`);
        }
      } else {
        state.items.push({ ...newBook, quantity: 1 });
        state.totalQuantity += 1;
      }

      saveCartToLocalStorage(state);
    },

    removeItemFromCart(state, action) {
      const bookId = action.payload;

      const existingBook = state.items.find(
        (item) =>
          item.id.toString().toLowerCase() === bookId.toString().toLowerCase()
      );

      if (existingBook) {
        if (existingBook.quantity > 1) {
          existingBook.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) =>
              item.id.toString().toLowerCase() !==
              existingBook.id.toString().toLowerCase()
          );
        }
      }
      saveCartToLocalStorage(state);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
