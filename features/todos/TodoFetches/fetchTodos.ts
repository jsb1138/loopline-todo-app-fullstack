export const fetchTodos = async () => {
  console.log("fetchTodos");
  const apiResponse = await fetch("http://3.125.43.144:8080/todos");

  if (!apiResponse.ok) {
    throw new Error("Failed to fetch todos");
  }

  return apiResponse.json();
};
