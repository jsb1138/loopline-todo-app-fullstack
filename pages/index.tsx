import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setInitialTodos } from "@/features/todos/todoSlice";
import TodoList from "@/features/todos/TodoList";
import NewTodo from "@/features/todos/NewTodo";
import BackgroundClickArea from "@/components/BackgroundClickArea";
import BatchDeleteButton from "@/components/BatchDeleteButton";

import { Todo } from "@/redux/store";

function App() {
  const dispatch = useDispatch();

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:8080/todos");
      const data = await response.json();
      dispatch(setInitialTodos(data));
      console.log("dot todo data>>>>", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("FETCHING TODOS");
    fetchTodos();
  }, []);

  return (
    <>
      <TodoList />
      <NewTodo />
      <BatchDeleteButton />
      <BackgroundClickArea />
    </>
  );
}

export default App;
