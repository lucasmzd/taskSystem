const API_URL = "http://localhost:4000/tasks";

export const fetchTasks = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const fetchTaskById = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

export const createTask = async (task: any) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const updateTask = async (id: string, task: any) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const deleteTask = async (id: string) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
