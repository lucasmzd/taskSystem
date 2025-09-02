import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";

export type Priority = "Low" | "Medium" | "High" | "Urgent";
export type Status = "Backlog" | "Unstarted" | "Started" | "Completed" | "Canceled";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({
    type: "enum",
    enum: ["Low", "Medium", "High", "Urgent"],
    nullable: true,
  })
  priority?: Priority;

  @Column({
    type: "enum",
    enum: ["Backlog", "Unstarted", "Started", "Completed", "Canceled"],
    default: "Backlog",
  })
  status!: Status;

  @Column({ type: "float", nullable: true })
  estimate?: number;

  @ManyToOne(() => Task, (task) => task.subtasks, { nullable: true })
  parentTask?: Task;

  @OneToMany(() => Task, (task) => task.parentTask, { cascade: true })
  subtasks: Task[] = [];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
