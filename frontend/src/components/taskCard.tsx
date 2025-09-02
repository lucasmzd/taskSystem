import { useState } from "react";

type Props = {
  task: any;
  onDetails: (id: string) => void;
};

export default function TaskCard({ task, onDetails }: Props) {
  const [showId, setShowId] = useState(false);

  return (
    <div style={{ border: "1px solid #ccc", padding: 10, marginBottom: 5 }}>
      <h3>{task.title}</h3>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority || "-"}</p>
      <p>
        ID:{" "}
        <span
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => setShowId(!showId)}
        >
          {showId ? task.id : "Click to show"}
        </span>
      </p>
      <p>Estimate: {task.estimate ?? "-"}</p>
      <p>Created at: {new Date(task.createdAt).toLocaleString()}</p>
      <button onClick={() => onDetails(task.id)}>Details</button>
    </div>
  );
}
