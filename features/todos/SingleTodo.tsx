import { useState } from "react";
import EditIcon from "@/components/Icons/EditIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import CancelIcon from "@/components/Icons/CancelIcon";

import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { deleteTodo } from "./TodoFetches/deleteTodo";
import { updateTodo } from "./TodoFetches/updateTodo";

import { Todo } from "@/types/Todo";

type SingleTodoProps = {
  todo: Todo;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function SingleTodo(props: SingleTodoProps) {
  const { todo, selected, setSelected } = props;
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const queryClient = useQueryClient();

  const mutation = useMutation(deleteTodo, {
    onSuccess: (id) => {
      queryClient.invalidateQueries(["todos"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updateMutation = useMutation(updateTodo, {
    onSuccess: (id) => {
      queryClient.invalidateQueries(["todos"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);

  const deleteHandler = (id: string) => {
    mutation.mutate(id);
  };

  function cancelUpdateHandler(id: string) {
    setCanEdit(!canEdit);
  }

  function updateHandler(id: string, title: string, description: string) {
    setSelected(selected.filter((todo) => todo !== id));
    setTitle(title);
    setDescription(description);
    setCanEdit(!canEdit);
  }

  const updateClickHandler = (
    id: string,
    title: string,
    description: string
  ) => {
    if (title && description) {
      updateMutation.mutate({ id, title, description });
      setCanEdit(!canEdit);
    } else {
      alert("Please enter a title and description");
    }
  };

  const updateSubmissionHandler = (
    e: React.FormEvent<HTMLFormElement>,
    id: string,
    title: string,
    description: string
  ) => {
    e.preventDefault();
    updateMutation.mutate({ id, title, description });
    setCanEdit(!canEdit);
  };

  function handleSelect(id: string) {
    if (selected.includes(id)) {
      setSelected(selected.filter((todo) => todo !== id));
      return;
    }
    setSelected([...selected, id]);
  }

  return (
    <div
      className={`todo fcsb ${selected.includes(todo.id) && "slctd-del"} ${
        canEdit && "slctd-edit"
      }`}
      key={todo.id}
      onClick={(e) => {
        if (e.ctrlKey || e.metaKey) {
          handleSelect(todo.id);
        }
      }}
    >
      {canEdit ? (
        <>
          <div className="todo-content">
            <form
              id="edit-form"
              onSubmit={(e) =>
                updateSubmissionHandler(e, todo.id, title, description)
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
              onClick={() => cancelUpdateHandler(todo.id)}
            >
              <CancelIcon />
            </button>
            <button
              type="submit"
              className="action-btn cf"
              onClick={() => updateClickHandler(todo.id, title, description)}
            >
              +
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="todo-content">
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
          </div>
          <div className="todo-actions fcsbc">
            <button
              id="delete-btn"
              className="action-btn cf"
              onClick={() => deleteHandler(todo.id)}
            >
              <DeleteIcon />
            </button>
            <button
              id="edit-btn"
              className="action-btn cf"
              onClick={() =>
                updateHandler(todo.id, todo.title, todo.description)
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
