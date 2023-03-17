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
    // // select todos
    // selectTodos: (state, action) => {
    //   switch (action.payload.type) {
    //     case "SELECT":
    //       return state.map((todo) => {
    //         if (todo.id === action.payload.id) {
    //           return {
    //             ...todo,
    //             selected: true,
    //           };
    //         }
    //         return todo;
    //       });
    //     case "DESELECT":
    //       return state.map((todo) => {
    //         if (todo.id === action.payload.id) {
    //           return {
    //             ...todo,
    //             selected: false,
    //           };
    //         }
    //         return todo;
    //       });
    //     default:
    //       return state;
    //   }
    // },
    // // deselect all todos
    // deselectTodos: (state, action) => {
    //   return state.map((todo) => {
    //     return {
    //       ...todo,
    //       selected: false,
    //     };
    //     return todo;
    //   });
    // },
    // // edit select
    // editSelect: (state, action) => {
    //   switch (action.payload.type) {
    //     case "SELECT":
    //       return state.map((todo) => {
    //         if (todo.id === action.payload.id) {
    //           return {
    //             ...todo,
    //             editing: true,
    //           };
    //         }
    //         return todo;
    //       });
    //     case "DESELECT":
    //       return state.map((todo) => {
    //         if (todo.id === action.payload.id) {
    //           return {
    //             ...todo,
    //             editing: false,
    //           };
    //         }
    //         return todo;
    //       });
    //     case "DESELECT ALL":
    //       return state.map((todo) => {
    //         return {
    //           ...todo,
    //           editing: false,
    //         };
    //         return todo;
    //       });
    //     default:
    //       return state;
    //   }
    // },
    // // get selected todos
    // getSelectedTodos: (state, action) => {
    //   return state.filter((item) => item.selected === true);
    // },
    // // delete selected todos
    // deleteSelectedTodos: (state, action) => {
    //   return state.filter((item) => item.selected !== true);
    // },
  },
});

export const {
  addTodos,
  removeTodos,
  updateTodos,
  // selectTodos,
  // deselectTodos,
  // editSelect,
  // getSelectedTodos,
  // deleteSelectedTodos,
  // setAllTodos,
  setInitialTodos,
} = todoSlice.actions;

export const getTodos = (state: RootState) => state.todos;

export const todoReducer = todoSlice.reducer;
