import { useState } from "react";

export type Priority = "Low" | "Medium" | "High" | "Urgent";
export type Status = "Backlog" | "Unstarted" | "Started" | "Completed" | "Canceled";

type Props = {
  onSubmit: (task: { title: string; status: Status; priority: Priority; estimate: number }) => void;
};

export default function TaskForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<Status>("Backlog");
  const [priority, setPriority] = useState<Priority>("Low");
  const [estimate, setEstimate] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !status || !priority || estimate < 0) return;
    onSubmit({ title, status, priority, estimate });
    setTitle("");
    setStatus("Backlog");
    setPriority("Low");
    setEstimate(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
      />

      <select value={status} onChange={(e) => setStatus(e.target.value as Status)} required>
        <option value="Backlog">Backlog</option>
        <option value="Unstarted">Unstarted</option>
        <option value="Started">Started</option>
        <option value="Completed">Completed</option>
        <option value="Canceled">Canceled</option>
      </select>

      <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)} required>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Urgent">Urgent</option>
      </select>

      <input
        type="number"
        value={estimate}
        onChange={(e) => setEstimate(Number(e.target.value))}
        min={0}
        placeholder="Estimate"
        required
      />

      <button type="submit">Add Task</button>
    </form>
  );
}
