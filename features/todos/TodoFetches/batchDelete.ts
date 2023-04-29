export const batchDelete = async (ids: string[]) => {
  const response = await fetch(`http://3.125.43.144:8080/todos/${ids}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to batch delete todos");
  }
  return response.json();
};
