import { useEffect, useState } from "react";
import { fetchTasks, fetchTaskById, createTask } from "../services/tasks";
import TaskForm from "../components/taskForm";
import TaskCard from "../components/taskCard";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<any>(null);

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

  const handleDetails = async (id: string) => {
    const task = await fetchTaskById(id);
    setSelectedTask(task);
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <h1>Task List</h1>
      <TaskForm onSubmit={handleCreate} />
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDetails={handleDetails} />
      ))}
      {selectedTask && (
        <div>
          <h2>Task Details</h2>
          <p><strong>Title:</strong> {selectedTask.title}</p>
          <p><strong>Status:</strong> {selectedTask.status}</p>
          <p><strong>Priority:</strong> {selectedTask.priority || "-"}</p>
          <p><strong>Estimate:</strong> {selectedTask.estimate ?? "-"}</p>
          <p><strong>Description:</strong> {selectedTask.description || "-"}</p>
          <p><strong>Created At:</strong> {new Date(selectedTask.createdAt).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(selectedTask.updatedAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
