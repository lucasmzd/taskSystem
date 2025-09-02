type Props = {
  task: any;
  onUpdate: (id: string, task: any) => void;
  onDelete: (id: string) => void;
};

export default function TaskCard({ task, onUpdate, onDelete }: Props) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 10, marginBottom: 5 }}>
      <h3>{task.title}</h3>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <button onClick={() => onUpdate(task.id, { ...task, status: "Completed" })}>
        Mark as Completed
      </button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}
