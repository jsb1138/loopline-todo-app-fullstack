export const deleteTodo = async (id: string) => {
  const response = await fetch(`http://3.125.43.144:8080/todo/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
  return response.json();
};
