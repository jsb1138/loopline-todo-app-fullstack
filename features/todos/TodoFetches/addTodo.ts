interface Todo {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export const addTodo = async (newTodo: Todo) => {
  const response = await fetch("http://3.125.43.144:8080/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) {
    throw new Error("Failed to add todo");
  }
  const data = await response.json();
  console.log("SUCCESS", data);
  return data;
};
