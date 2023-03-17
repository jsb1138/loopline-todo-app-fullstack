import { createSlice } from "@reduxjs/toolkit";
import { RootState, Todo } from "@/redux/store";

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setInitialTodos: (state, action) => {
      return action.payload;
    },
    addTodos: (state, action) => {
      state.push(action.payload);
      return state;
    },
    // // remove todos
    removeTodos: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    // // update todos
    updateTodos: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            title: action.payload.title,
            description: action.payload.description,
            updatedAt: action.payload.updatedAt,
          };
        }
        return todo;
      });
    },
    // // delete selected todos
    deleteSelectedTodos: (state, action) => {
      return state.filter((todo) => {
        if (!action.payload.includes(todo.id)) {
          return {
            ...todo,
          };
        }
      });
    },
  },
});

export const {
  addTodos,
  removeTodos,
  updateTodos,
  deleteSelectedTodos,
  setInitialTodos,
} = todoSlice.actions;

export const getTodos = (state: RootState) => state.todos;

export const todoReducer = todoSlice.reducer;
