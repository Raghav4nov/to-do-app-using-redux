import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  list: Todo[];
}

const initialState: TodoState = {
  list: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.list.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.list.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(t => t.id !== action.payload);
    },
    clearTodos: (state) => {
      state.list = [];
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, clearTodos } = todoSlice.actions;
export default todoSlice.reducer;
