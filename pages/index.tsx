import Head from "next/document";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setInitialTodos } from "@/features/todos/todoSlice";
import TodoList from "@/features/todos/TodoList";
import NewTodo from "@/features/todos/NewTodo";
import BackgroundClickArea from "@/components/BackgroundClickArea";
import BatchDeleteButton from "@/components/BatchDeleteButton";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchTodos = async () => {
    try {
      // setIsLoading(!isLoading);
      const response = await fetch("http://localhost:8080/todos");
      const data = await response.json();
      console.log("FETCH RESPONSE:", data);
      if (data) {
        dispatch(setInitialTodos(data));
        setIsLoading(!isLoading);
      } else {
        setIsLoading(!isLoading);
        console.log("NO DATA");
      }
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
      {isLoading && <div className="w100 h100 cf">Loading...</div>}
      <TodoList />
      <NewTodo />
      <BatchDeleteButton />
      <BackgroundClickArea />
    </>
  );
}

export default App;
