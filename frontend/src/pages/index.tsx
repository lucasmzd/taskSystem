import { useEffect, useState } from "react";
import { fetchTasks, createTask } from "../services/tasks";
import TaskForm from "../components/taskForm/taskForm";
import TaskCard from "../components/taskCard/taskCard";
import styles from "../styles/home.module.css";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

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
    // setShowForm(false); Cerrar form luego de crear
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span style={{ color: "#ffffff" }}>Task Manager</span>
          <span style={{ color: "#3172d5" }}>.</span>
        </h1>
      </header>

      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className={styles.createButton}
          >
            +<span style={{ marginLeft: 8 }}>Create New Task</span>
          </button>
          {showForm && <TaskForm onSubmit={handleCreate} />}
        </aside>

        <main className={styles.main}>
          <div className={styles.tasksGrid}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
