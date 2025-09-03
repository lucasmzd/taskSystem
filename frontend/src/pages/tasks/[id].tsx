import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchTaskById, updateTask, deleteTask, createTask } from "../../services/tasks";
import styles from "../../styles/[id].module.css";

export default function TaskDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [task, setTask] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const [showSubtaskForm, setShowSubtaskForm] = useState(false);
  const [subTitle, setSubTitle] = useState("");
  const [subStatus, setSubStatus] = useState("Backlog");
  const [subPriority, setSubPriority] = useState("Low");
  const [subEstimate, setSubEstimate] = useState(0);

  const loadTask = async (taskId: string) => {
    setLoading(true);
    const data = await fetchTaskById(taskId);
    setTask(data);
    setLoading(false);
  };

  useEffect(() => {
    if (id) loadTask(id as string);
  }, [id]);

  if (loading) return <p className={styles.loading}>Loading task...</p>;
  if (!task) return <p className={styles.loading}>Task not found</p>;

  const handleUpdate = async () => {
    await updateTask(task.id, { status: task.status, priority: task.priority, estimate: task.estimate, description: task.description });
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
    setShowSubtaskForm(false);
  };

  return (
    <div className={styles.page}>
      {/* Navbar */}
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span style={{ color: "#ffffffff" }}>Task Manager</span>
          <span style={{ color: "#3172d5" }}>.</span>
        </h1>
      </header>

      <div className={styles.container}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <button onClick={() => router.push("/")} className={styles.sidebarButton}>
            Back
          </button>
        </aside>

        {/* Main content */}
        <main className={styles.main}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{task.title}</h2>

            <div className={styles.cardRow}>
              <label>Status:</label>
              <select
                value={task.status}
                onChange={(e) => setTask({ ...task, status: e.target.value })}
                className={styles.select}
              >
                <option value="Backlog">Backlog</option>
                <option value="Unstarted">Unstarted</option>
                <option value="Started">Started</option>
                <option value="Completed">Completed</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>

            <div className={styles.cardRow}>
              <label>Priority:</label>
              <select
                value={task.priority}
                onChange={(e) => setTask({ ...task, priority: e.target.value })}
                className={styles.select}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div className={styles.cardRow}>
              <label>Estimate:</label>
              <input
                type="number"
                min={0}
                value={task.estimate}
                onChange={(e) => setTask({ ...task, estimate: Number(e.target.value) })}
                className={styles.input}
              />
            </div>

            <div className={styles.cardRow}>
              <label>Description:</label>
              <textarea
                value={task.description || ""}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                className={styles.textarea}
              />
            </div>

            <div className={styles.cardButtons}>
              <button onClick={handleUpdate} className={styles.button}>Update</button>
              <button onClick={handleDelete} className={styles.buttonDelete}>Delete</button>
              <button
                onClick={() => setShowSubtaskForm(!showSubtaskForm)}
                className={styles.buttonSecondary}
              >
                {showSubtaskForm ? "Cancel" : "Add Subtask"}
              </button>
            </div>

            {showSubtaskForm && (
              <div className={styles.subtaskForm}>
                <input
                  type="text"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  placeholder="Subtask title"
                  className={styles.input}
                />
                <select
                  value={subStatus}
                  onChange={(e) => setSubStatus(e.target.value)}
                  className={styles.select}
                >
                  <option value="Backlog">Backlog</option>
                  <option value="Unstarted">Unstarted</option>
                  <option value="Started">Started</option>
                  <option value="Completed">Completed</option>
                  <option value="Canceled">Canceled</option>
                </select>
                <select
                  value={subPriority}
                  onChange={(e) => setSubPriority(e.target.value)}
                  className={styles.select}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
                <input
                  type="number"
                  min={0}
                  value={subEstimate}
                  onChange={(e) => setSubEstimate(Number(e.target.value))}
                  placeholder="Estimate"
                  className={styles.input}
                />
                <button onClick={handleAddSubtask} className={styles.button}>
                  Add Subtask
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
