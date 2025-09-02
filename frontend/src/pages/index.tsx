import { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../services/tasks";
import TaskCard from "../components/taskCard";
import TaskForm from "../components/taskForm";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    setLoading(true);
    const data = await fetchTasks();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async (task: any) => {
    const newTask = await createTask(task);
    setTasks([...tasks, newTask]);
  };

  const handleUpdate = async (id: string, task: any) => {
    const updated = await updateTask(id, task);
    setTasks(tasks.map((t) => (t.id === id ? updated : t)));
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <h1>Task List</h1>
      <TaskForm onSubmit={handleCreate} />
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
