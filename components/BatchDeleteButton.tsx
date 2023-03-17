import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSelectedTodos } from "@/features/todos/selectedSlice";
import { deleteSelectedTodos } from "@/features/todos/todoSlice";
import { deselectAllTodos } from "@/features/todos/selectedSlice";
import DeleteAllIcon from "@/components/Icons/DeleteAllIcon";

import { Todo } from "@/redux/store";

export default function BatchDeleteButton() {
  const dispatch = useDispatch();
  const selectedTodos = useSelector(getSelectedTodos);
  // const dispatch = useDispatch();

  const batchDeleteHandler = async (ids: string[]) => {
    console.log("ids", JSON.stringify(ids));
    try {
      const response = await fetch(`http://localhost:8080/todos/${ids}`, {
        method: "DELETE",
      });
      const data = await response.json();
      dispatch(deleteSelectedTodos(ids));
      dispatch(deselectAllTodos(null));
      console.log("DELETE RESPONSE", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`batch-del-btn ${selectedTodos.length >= 1 ? "show" : "hide"}`}
      onClick={() => batchDeleteHandler(selectedTodos)}
    >
      <DeleteAllIcon />
    </div>
  );
}
