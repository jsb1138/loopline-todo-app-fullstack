interface updateTodoProps {
  id: string;
  title: string;
  description: string;
}

export const updateTodo = async ({
  id,
  title,
  description,
}: updateTodoProps) => {
  const response = await fetch(`http://3.125.43.144:8080/todo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      title,
      description,
      updated_at: new Date().toISOString(),
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to update todo");
  }
  return response.json();
};
