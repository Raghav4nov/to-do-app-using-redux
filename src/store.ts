// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("todos");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
};


const saveState = (state: { todos: { list: any[] } }) => {
  try {
    const serializedState = JSON.stringify(state.todos);
    localStorage.setItem("todos", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

const preloadedState = {
  todos: loadState() || { list: [] },
};

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
