import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSelectedTodos } from "@/features/todos/selectedSlice";
// import { deleteSelectedTodos } from "@/features/todos/todoSlice";
import DeleteAllIcon from "@/components/Icons/DeleteAllIcon";

import { Todo } from "@/redux/store";

export default function BatchDeleteButton() {
  const selectedTodos = useSelector(getSelectedTodos);
  // const dispatch = useDispatch();

  // function batchDeleteHandler() {
  //   dispatch(deleteSelectedTodos(null));
  // }

  return (
    <div
      className={`batch-del-btn ${selectedTodos.length >= 1 ? "show" : "hide"}`}
      // onClick={batchDeleteHandler}
    >
      <DeleteAllIcon />
    </div>
  );
}
