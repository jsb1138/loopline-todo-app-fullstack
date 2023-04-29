import DeleteAllIcon from "@/components/Icons/DeleteAllIcon";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { batchDelete } from "@/features/todos/TodoFetches/batchDelete";

interface BatchDeleteButtonProps {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function BatchDeleteButton(props: BatchDeleteButtonProps) {
  const { selected, setSelected } = props;

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
