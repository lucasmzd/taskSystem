import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchTaskById, updateTask, deleteTask } from "../../services/tasks";

export default function TaskDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [task, setTask] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [estimate, setEstimate] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (id) {
      const loadTask = async () => {
        setLoading(true);
        const data = await fetchTaskById(id as string);
        setTask(data);
        setStatus(data.status);
        setPriority(data.priority);
        setEstimate(data.estimate);
        setDescription(data.description || "");
        setLoading(false);
      };
      loadTask();
    }
  }, [id]);

  if (loading) return <p>Loading task...</p>;
  if (!task) return <p>Task not found</p>;

  const handleUpdate = async () => {
    const updatedTask = await updateTask(task.id, {
      status,
      priority,
      estimate,
      description,
    });
    setTask(updatedTask);
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    router.push("/");
  };

  return (
    <div>
      <h1>Task Details</h1>
      <p><strong>Title:</strong> {task.title}</p>

      <div>
        <label>Status: </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Backlog">Backlog</option>
          <option value="Unstarted">Unstarted</option>
          <option value="Started">Started</option>
          <option value="Completed">Completed</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>

      <div>
        <label>Priority: </label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>

      <div>
        <label>Estimate: </label>
        <input
          type="number"
          value={estimate}
          onChange={(e) => setEstimate(Number(e.target.value))}
          min={0}
        />
      </div>

      <div>
        <label>Description: </label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <button onClick={handleUpdate} style={{ marginRight: "10px" }}>
        Update Task
      </button>
      <button onClick={handleDelete}>Delete Task</button>

      <p><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>
      <p><strong>Updated At:</strong> {new Date(task.updatedAt).toLocaleString()}</p>

      {task.subtasks && task.subtasks.length > 0 && (
        <div>
          <h2>Subtasks</h2>
          <ul>
            {task.subtasks.map((sub: any) => (
              <li key={sub.id}>
                {sub.title} - Status: {sub.status} - Priority: {sub.priority} - Estimate: {sub.estimate}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
