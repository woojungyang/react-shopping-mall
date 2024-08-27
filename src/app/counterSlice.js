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
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveStateToLocalStorage({ ...state });
    },
    clearCart: (state) => {
      state.items = [];
      saveStateToLocalStorage({ ...state });
    },
  },
});

export const { removeItem, addItem, clearCart } = counterSlice.actions;

export default counterSlice.reducer;
