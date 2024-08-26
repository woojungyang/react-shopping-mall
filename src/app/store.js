import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counterSlice";

export function saveStateToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (e) {
    console.log(e);
  }
}

export function loadStateFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  preloadedState: loadStateFromLocalStorage(),
});

store.subscribe(() => {
  const state = store.getState();
  console.log(state);
  saveStateToLocalStorage(state);
});

export default store;
