import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { addTodo } from "./TodoFetches/addTodo";

function NewToDo() {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [invalidInput, setInvalidInput] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onDescChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDesc(e.target.value);

  const mutation = useMutation(addTodo, {
    onSuccess: (newTodo) => {
      queryClient.setQueryData(["todos"], (oldTodos: any) => [
        ...oldTodos,
        newTodo,
      ]);
    },
  });

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && desc) {
      const newTodo = {
        id: nanoid(),
        title,
        description: desc,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setTitle("");
      setDesc("");
      await mutation.mutateAsync(newTodo);
      return;
    }
    setInvalidInput(true);
    setTimeout(() => {
      setInvalidInput(false);
    }, 2000);
  };

  return (
    <>
      <div className="form-container">
        <p
          className={`error-msg w100 cf ${
            invalidInput ? "show-msg" : "hide-msg"
          }`}
        >
          <strong>Please fill in both inputs!</strong>
        </p>
        <form id="todo-form" onSubmit={submitHandler}>
          <label htmlFor="title"></label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="What is your to-do?"
            value={title}
            onChange={onTitleChange}
            autoFocus
          />
          <label htmlFor="todo-desc" className="cf"></label>
          <input
            type="text"
            id="todo-desc"
            name="todo-desc"
            placeholder="Add some details..."
            value={desc}
            onChange={onDescChange}
          />
          <button id="add-btn" type="submit" className="add-btn cf">
            +
          </button>
        </form>
      </div>
      <div className="fade-out"></div>
    </>
  );
}

export default NewToDo;
