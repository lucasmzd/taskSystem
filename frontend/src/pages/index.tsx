import { useEffect, useState } from "react";
import { fetchTasks, createTask } from "../services/tasks";
import TaskForm from "../components/taskForm";
import TaskCard from "../components/taskCard";

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

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <h1>Task List</h1>
      <TaskForm onSubmit={handleCreate} />
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
