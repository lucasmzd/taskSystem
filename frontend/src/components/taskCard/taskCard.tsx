import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./taskCard.module.css";

type Props = {
  task: {
    id: string;
    title: string;
    status: string;
    priority: string;
    estimate: number;
    createdAt: string;
  };
};

export default function TaskCard({ task }: Props) {
  const [showId, setShowId] = useState(false);
  const router = useRouter();

  const handleDetails = () => {
    router.push(`/tasks/${task.id}`);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{task.title}</h3>
      <p className={styles.details}>Status: {task.status}</p>
      <p className={`${styles.details} ${styles[task.priority.toLowerCase()]}`}>
        Priority: {task.priority}
      </p>
      <p className={styles.details}>
        ID:{" "}
        <span onClick={() => setShowId(!showId)}>
          {showId ? task.id : "Click to show"}
        </span>
      </p>
      <p className={styles.details}>Estimate: {task.estimate}</p>
      <p className={styles.details}>Created at: {new Date(task.createdAt).toLocaleString()}</p>
      <button className={styles.button} onClick={handleDetails}>Details</button>
    </div>
  );
}
