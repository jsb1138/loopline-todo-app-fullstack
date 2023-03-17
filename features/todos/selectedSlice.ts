import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

const initialState: string[] = [];

const selectedSlice = createSlice({
  name: "selectedTodos",
  initialState,
  reducers: {
    // // select todos
    selectTodos: (state, action) => {
      state.push(action.payload);
      return state;
    },
    // // remove todos
    deselectTodos: (state, action) => {
      return state.filter((todoId) => todoId !== action.payload);
    },
    // // remove all todos
    deselectAllTodos: (state, action) => {
      state.length = 0;
    },
  },
});

export const { selectTodos, deselectTodos, deselectAllTodos } =
  selectedSlice.actions;

export const getSelectedTodos = (state: RootState) => state.selectedTodos;

export const selectedTodoReducer = selectedSlice.reducer;
