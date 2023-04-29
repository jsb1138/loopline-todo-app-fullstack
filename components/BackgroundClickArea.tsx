import { useContext } from "react";
import SelectedTodosContext from "@/context/selected-todos-context";

export default function BackgroundClickArea() {
  const { setSelected } = useContext(SelectedTodosContext);
  function deselectHandler() {
    setSelected([]);
  }
  return <div className="bg-click-area" onClick={deselectHandler}></div>;
}
