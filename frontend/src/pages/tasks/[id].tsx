import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchTaskById } from "../../services/tasks";

export default function TaskDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const loadTask = async () => {
        setLoading(true);
        const data = await fetchTaskById(id as string);
        setTask(data);
        setLoading(false);
      };
      loadTask();
    }
  }, [id]);

  if (loading) return <p>Loading task...</p>;
  if (!task) return <p>Task not found</p>;

  return (
    <div>
      <h1>Task Details</h1>
      <p><strong>Title:</strong> {task.title}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Estimate:</strong> {task.estimate}</p>
      <p><strong>Description:</strong> {task.description || "-"}</p>
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

