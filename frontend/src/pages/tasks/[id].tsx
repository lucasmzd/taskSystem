import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchTaskById, updateTask, deleteTask, createTask } from "../../services/tasks";

export default function TaskDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [task, setTask] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [estimate, setEstimate] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  const [subTitle, setSubTitle] = useState<string>("");
  const [subStatus, setSubStatus] = useState<string>("Backlog");
  const [subPriority, setSubPriority] = useState<string>("Low");
  const [subEstimate, setSubEstimate] = useState<number>(0);

  const loadTask = async (taskId: string) => {
    setLoading(true);
    const data = await fetchTaskById(taskId);
    setTask(data);
    setStatus(data.status);
    setPriority(data.priority);
    setEstimate(data.estimate);
    setDescription(data.description || "");
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      loadTask(id as string);
    }
  }, [id]);

  if (loading) return <p>Loading task...</p>;
  if (!task) return <p>Task not found</p>;

  const handleUpdate = async () => {
    await updateTask(task.id, { status, priority, estimate, description });
    await loadTask(task.id);
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    router.push("/");
  };

  const handleAddSubtask = async () => {
    if (!subTitle.trim()) return;
    await createTask({
      title: subTitle,
      status: subStatus,
      priority: subPriority,
      estimate: subEstimate,
      parentTask: { id: task.id },
    });
    await loadTask(task.id);
    setSubTitle("");
    setSubStatus("Backlog");
    setSubPriority("Low");
    setSubEstimate(0);
  };

  const handleUpdateSubtask = async (subId: string, updatedFields: any) => {
    await updateTask(subId, updatedFields);
    await loadTask(task.id);
  };

  const handleDeleteSubtask = async (subId: string) => {
    await deleteTask(subId);
    await loadTask(task.id);
  };

  const calculateEstimates = (subtasks: any[]) => {
    let pending = 0;
    let inProgress = 0;
    let overall = 0;

    const traverse = (subs: any[]) => {
      subs.forEach((s: any) => {
        const est = s.estimate || 0;
        overall += est;
        if (s.status === "Backlog" || s.status === "Unstarted") pending += est;
        if (s.status === "Started") inProgress += est;
        if (s.subtasks && s.subtasks.length > 0) traverse(s.subtasks);
      });
    };

    traverse(subtasks);
    return { pending, inProgress, overall };
  };

  const { pending, inProgress, overall } = calculateEstimates(task.subtasks || []);

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
              <li key={sub.id} style={{ marginBottom: "5px" }}>
                <strong>{sub.title}</strong>
                <div>
                  <label>Status: </label>
                  <select
                    value={sub.status}
                    onChange={(e) => handleUpdateSubtask(sub.id, { status: e.target.value })}
                  >
                    <option value="Backlog">Backlog</option>
                    <option value="Unstarted">Unstarted</option>
                    <option value="Started">Started</option>
                    <option value="Completed">Completed</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                  <label>Estimate: </label>
                  <input
                    type="number"
                    value={sub.estimate}
                    min={0}
                    onChange={(e) => handleUpdateSubtask(sub.id, { estimate: Number(e.target.value) })}
                  />
                  <button onClick={() => handleDeleteSubtask(sub.id)}>Delete</button>
                </div>

                {sub.subtasks && sub.subtasks.length > 0 && (
                  <ul style={{ marginLeft: "20px" }}>
                    {sub.subtasks.map((nested: any) => (
                      <li key={nested.id}>
                        {nested.title} - Status: {nested.status} - Priority: {nested.priority} - Estimate: {nested.estimate}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "15px" }}>
            <h3>Estimates Summary</h3>
            <p><strong>Pending Total:</strong> {pending}</p>
            <p><strong>In Progress Total:</strong> {inProgress}</p>
            <p><strong>Overall Total:</strong> {overall}</p>
          </div>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <h3>Add Subtask</h3>
        <input
          type="text"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          placeholder="Subtask title"
          required
        />
        <select value={subStatus} onChange={(e) => setSubStatus(e.target.value)}>
          <option value="Backlog">Backlog</option>
          <option value="Unstarted">Unstarted</option>
          <option value="Started">Started</option>
          <option value="Completed">Completed</option>
          <option value="Canceled">Canceled</option>
        </select>
        <select value={subPriority} onChange={(e) => setSubPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
        <input
          type="number"
          value={subEstimate}
          onChange={(e) => setSubEstimate(Number(e.target.value))}
          min={0}
          placeholder="Estimate"
        />
        <button onClick={handleAddSubtask}>Add Subtask</button>
      </div>
    </div>
  );
}
