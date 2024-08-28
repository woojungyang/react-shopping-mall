import { createSlice } from "@reduxjs/toolkit";

import { saveStateToLocalStorage } from "./store";

const initialState = {
  items: [],
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.optionsId === action.payload.optionsId,
      );

      if (existingItem) existingItem.quantity += action.payload.quantity;
      else state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      console.log(typeof action.payload);
      /* state.items = state.items.filter((item) => item.id !== action.payload);
      saveStateToLocalStorage({ ...state }); */
    },
    clearCart: (state) => {
      state.items = [];
      saveStateToLocalStorage({ ...state });
    },
  },
});

export const { removeItem, addItem, clearCart } = counterSlice.actions;

export default counterSlice.reducer;
