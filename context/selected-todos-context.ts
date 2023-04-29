import { createContext } from "react";

type SelectedTodosContextType = {
  selected: string[];
  setSelected: (todos: string[]) => void;
};

const SelectedTodosContext = createContext<SelectedTodosContextType>({
  selected: [],
  setSelected: () => {},
});

export default SelectedTodosContext;
