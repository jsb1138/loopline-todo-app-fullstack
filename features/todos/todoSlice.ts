import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

const initialState = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setInitialTodos: (state, action) => {
      return action.payload;
    },
    // setAllTodos: (state, action) => {
    //   console.log("setAllTodos", action.payload);
    //   return action.payload;
    // return {
    //   ...state,
    //   todos: action.payload,
    // };
    // },
    // // add todos
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
