import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { todoReducer } from "../features/todos/todoSlice";
import { selectedTodoReducer } from "../features/todos/selectedSlice";

const reducer = combineReducers({
  todos: todoReducer,
  selectedTodos: selectedTodoReducer,
});

export const store = configureStore({
  reducer: reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type Todo = {
  id: string;
  title: string;
  description: string;
  // selected: boolean;
  // editing: boolean;
};
