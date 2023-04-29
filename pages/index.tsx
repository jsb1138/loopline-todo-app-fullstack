import TodoList from "@/features/todos/TodoList";
import NewTodo from "@/features/todos/NewTodo";
import BackgroundClickArea from "@/components/BackgroundClickArea";
import BatchDeleteButton from "@/components/BatchDeleteButton";
import { useState } from "react";

function App() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <>
      <TodoList setSelected={setSelected} selected={selected} />
      <NewTodo />
      <BatchDeleteButton selected={selected} setSelected={setSelected} />
      <BackgroundClickArea />
    </>
  );
}

export default App;
