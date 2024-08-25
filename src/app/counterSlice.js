import { createSlice } from "@reduxjs/toolkit";

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
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { removeItem, addItem, clearCart } = counterSlice.actions;

export default counterSlice.reducer;
