import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  priority?: "Low" | "Medium" | "High" | "Urgent";

  @Column({ default: "Backlog" })
  status!: "Backlog" | "Unstarted" | "Started" | "Completed" | "Canceled";

  @Column({ type: "float", nullable: true })
  estimate?: number;

  @ManyToOne(() => Task, (task) => task.subtasks, { nullable: true })
  parentTask?: Task;

  @OneToMany(() => Task, (task) => task.parentTask)
  subtasks?: Task[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
