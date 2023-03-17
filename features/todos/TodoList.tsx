import { useState } from "react";
import { useSelector } from "react-redux";
import { getTodos } from "@/features/todos/todoSlice";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import SingleTodo from "./SingleTodo";

import { Todo } from "@/redux/store";

export default function ToDoList() {
  const [selected, setSelected] = useState<string[]>([""]);
  const todos = useSelector(getTodos);
  const [parent] = useAutoAnimate({
    duration: 300,
    easing: "ease-in-out",
  });

  return (
    <>
      {Object.keys(todos).length === 0 ? (
        <div className="w100 h100 cf">LOADING...</div>
      ) : (
        <section className="todo-list">
          <div className="todo-list-container" ref={parent}>
            {todos.map((todo: Todo) => (
              <SingleTodo
                key={todo.id}
                todo={todo}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
