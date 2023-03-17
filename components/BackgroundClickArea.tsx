import { useDispatch } from "react-redux";
import { deselectAllTodos } from "@/features/todos/selectedSlice";

export default function BackgroundClickArea() {
  const dispatch = useDispatch();

  function deselectHandler() {
    dispatch(deselectAllTodos(null));
  }
  return <div className="bg-click-area" onClick={deselectHandler}></div>;
}
