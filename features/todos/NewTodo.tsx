import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodos } from "@/features/todos/todoSlice";
import { nanoid } from "@reduxjs/toolkit";

function NewToDo() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [invalidInput, setInvalidInput] = useState<boolean>(false);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onDescChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDesc(e.target.value);

  const handleNewTodoSubmission = async () => {
    history.replaceState("object or string", "title", "");
    if (title && desc) {
      try {
        const newTodo = {
          id: nanoid(),
          title,
          description: desc,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        dispatch(addTodos(newTodo));
        setTitle("");
        setDesc("");
        const response = await fetch("http://3.125.43.144:8080/todo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        });
        const data = await response.json();
        console.log("POST RESPONSE:", data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setInvalidInput(true);
      setTimeout(() => {
        setInvalidInput(false);
      }, 2000);
    }
  };

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleNewTodoSubmission();
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
