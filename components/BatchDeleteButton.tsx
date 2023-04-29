import { useContext } from "react";
import DeleteAllIcon from "@/components/Icons/DeleteAllIcon";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { batchDelete } from "@/features/todos/TodoFetches/batchDelete";

import SelectedTodosContext from "@/context/selected-todos-context";

export default function BatchDeleteButton() {
  const { selected, setSelected } = useContext(SelectedTodosContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(batchDelete, {
    onSuccess: (ids) => {
      queryClient.invalidateQueries(["todos"]);
      setSelected([]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const batchDeleteHandler = async (ids: string[]) => {
    await mutation.mutate(ids);
  };

  return (
    <div
      className={`batch-del-btn ${selected.length >= 1 ? "show" : "hide"}`}
      onClick={() => batchDeleteHandler(selected)}
    >
      <DeleteAllIcon />
    </div>
  );
}
