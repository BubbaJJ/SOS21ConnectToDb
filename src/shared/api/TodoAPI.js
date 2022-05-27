const url = "https://localhost:44301/api/todo/";

export const GetTodoList = async () => {
  return await fetch(url + "gettodos").then((response) => response.json());
};

export const GetTodoById = async (id) => {
  return await fetch(url + id).then((response) => response.json());
};

export const CreateTodo = async (todo) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: todo.name,
    }),
  });
  return await response.json();
};

export const UpdateTodo = async (todo) => {
  const response = await fetch(url + "UpdateTodo/" + todo.id, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: todo.name,
      completed: todo.completed,
      dateAdded: todo.dateAdded,
      dateFinished: todo.dateFinished,
      dueDate: todo.dueDate,
    }),
  });
  return await response.json();
};

export const DeleteTodo = async (todo) => {
  await fetch(url + todo.id, {
    method: "DELETE",
  });
};
