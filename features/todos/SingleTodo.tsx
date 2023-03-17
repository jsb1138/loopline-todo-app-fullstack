import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import EditIcon from "@/components/Icons/EditIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import CancelIcon from "@/components/Icons/CancelIcon";
import {
  removeTodos,
  updateTodos,
  // selectTodos,
  // deselectTodos,
  // editSelect,
} from "@/features/todos/todoSlice";
import { getSelectedTodos } from "@/features/todos/selectedSlice";
import { selectTodos, deselectTodos } from "./selectedSlice";

import { Todo } from "@/redux/store";

type SingleTodoProps = {
  todo: Todo;
  selected: string[];
  setSelected: any;
};

export default function SingleTodo(props: SingleTodoProps) {
  const selectedTodos = useSelector(getSelectedTodos);
  const dispatch = useDispatch();
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);

  const deleteHandler = async (id: string) => {
    try {
      dispatch(removeTodos(id));
      const response = await fetch(`http://localhost:8080/todo/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log("DELETE RESPONSE", data);
      // setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  // function cancelUpdateHandler(id: string) {
  //   setCanEdit(!canEdit);
  //   dispatch(editSelect({ type: "DESELECT", id }));
  // }

  function updateHandler(id: string, title: string, description: string) {
    // dispatch(deselectTodos(null));
    // dispatch(editSelect({ type: "SELECT", id }));
    setTitle(title);
    setDescription(description);
    setCanEdit(!canEdit);
  }

  const updateClickHandler = async (
    id: string,
    title: string,
    description: string
  ) => {
    try {
      const response = await fetch(`http://localhost:8080/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      const data = await response.json();
      console.log("UPDATE RESPONSE", data);
      dispatch(updateTodos({ id, title, description }));
      setCanEdit(!canEdit);
      // dispatch(editSelect({ type: "DESELECT", id }));
    } catch (error) {}
  };

  const updateSubmissionHandler = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string,
    title: string,
    description: string
  ) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      const data = await response.json();
      console.log("UPDATE RESPONSE", data);
      dispatch(updateTodos({ id, title, description }));
      setCanEdit(!canEdit);
      // dispatch(editSelect({ type: "DESELECT", id }));
    } catch (error) {}
  };

  function handleSelect(id: string) {
    if (selectedTodos.includes(id)) {
      dispatch(deselectTodos(id));
      return;
    }
    dispatch(selectTodos(id));
    //   if (props.selected.includes(id)) {
    //     props.setSelected(props.selected.filter((item) => item !== id));
    //     return;
    //   }
    //   props.setSelected((prevArr) => [...prevArr, id]);
    //   // if (todo.editing) {
    //   //   cancelUpdateHandler(id);
    //   //   dispatch(editSelect({ type: "DESELECT ALL" }));
    //   // }
    //   // if (todo.selected) {
    //   //   dispatch(selectTodos({ type: "DESELECT", id }));
    //   //   return;
    //   // }
    //   // dispatch(selectTodos({ type: "SELECT", id }));
  }

  // console.log("PROPS", props.todo.id);
  return (
    // <> </>
    <div
      className={`todo fcsb ${
        selectedTodos.includes(props.todo.id) && "slctd-del"
      } ${canEdit && "slctd-edit"}`}
      key={props.todo.id}
      onClick={(e) => {
        if (e.ctrlKey || e.metaKey) {
          handleSelect(props.todo.id);
        }
      }}
    >
      {canEdit ? (
        <>
          <div className="todo-content">
            <form
              id="edit-form"
              onSubmit={(e) =>
                updateSubmissionHandler(e, props.todo.id, title, description)
              }
            >
              <label htmlFor="title"></label>
              <input
                type="text"
                id="title-edit"
                name="title"
                value={title}
                onChange={onTitleChange}
                autoFocus
              />
              <label htmlFor="todo-description" className="cf"></label>
              <input
                type="text"
                id="desc-edit"
                name="todo-description"
                value={description}
                onChange={onDescriptionChange}
              />
              <input type="submit" className="hidden-btn" />
            </form>
          </div>
          <div className="todo-actions fcsbc">
            <button
              className="action-btn cf"
              onClick={() => cancelUpdateHandler(props.todo.id)}
            >
              <CancelIcon />
            </button>
            <button
              type="submit"
              className="action-btn cf"
              onClick={() =>
                updateClickHandler(props.todo.id, title, description)
              }
            >
              +
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="todo-content">
            <h3>{props.todo.title}</h3>
            <p>{props.todo.description}</p>
          </div>
          <div className="todo-actions fcsbc">
            <button
              id="delete-btn"
              className="action-btn cf"
              onClick={() => deleteHandler(props.todo.id)}
            >
              <DeleteIcon />
            </button>
            <button
              id="edit-btn"
              className="action-btn cf"
              onClick={() =>
                updateHandler(
                  props.todo.id,
                  props.todo.title,
                  props.todo.description
                )
              }
            >
              <EditIcon />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
