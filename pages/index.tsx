import TodoList from "@/features/todos/TodoList";
import NewTodo from "@/features/todos/NewTodo";
import BackgroundClickArea from "@/components/BackgroundClickArea";
import BatchDeleteButton from "@/components/BatchDeleteButton";
import { useState } from "react";

function App() {
  const [selected, setSelected] = useState<string[]>([]);
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
