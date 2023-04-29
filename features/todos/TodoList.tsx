import { useAutoAnimate } from "@formkit/auto-animate/react";

import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "./TodoFetches/fetchTodos";

import SingleTodo from "./SingleTodo";

import { Todo } from "@/types/Todo";

interface TodoListProps {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ToDoList(props: TodoListProps) {
  const { selected, setSelected } = props;
  const [parent] = useAutoAnimate({
    duration: 300,
    easing: "ease-in-out",
  });

  const { isLoading, error, data: todos } = useQuery(["todos"], fetchTodos);

  if (isLoading) return <div className="w100 h100 cf">Loading...</div>;

  if (error) return <div className="w100 h100 cf">Error</div>;
  return (
    <>
      {Object.keys(todos).length === 0 ? (
        <div className="w100 h100 cf">Add something</div>
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
