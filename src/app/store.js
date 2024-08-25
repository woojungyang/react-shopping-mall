import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counterSlice";

const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (e) {
    console.log(e);
  }
};

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  preloadedState: loadStateFromLocalStorage(),
});

store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export default store;
