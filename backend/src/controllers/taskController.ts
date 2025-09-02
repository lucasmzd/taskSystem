import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Task } from "../entities/Task";

const taskRepo = AppDataSource.getRepository(Task);

export const getTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await taskRepo.find({
      select: ["id", "title", "status", "priority", "estimate", "createdAt"],
      order: { createdAt: "DESC" },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const task = await taskRepo.findOne({
    where: { id: req.params.id },
    relations: ["subtasks", "parentTask"],
  });
  task ? res.json(task) : res.status(404).json({ message: "Task not found" });
};

export const createTask = async (req: Request, res: Response) => {
  const newTask = taskRepo.create(req.body);
  const savedTask = await taskRepo.save(newTask);
  res.status(201).json(savedTask);
};

export const updateTask = async (req: Request, res: Response) => {
  const task = await taskRepo.findOneBy({ id: req.params.id });
  if (!task) return res.status(404).json({ message: "Task not found" });

  taskRepo.merge(task, req.body);
  const updatedTask = await taskRepo.save(task);
  res.json(updatedTask);
};

export const deleteTask = async (req: Request, res: Response) => {
  const result = await taskRepo.delete(req.params.id);
  result.affected ? res.status(204).send() : res.status(404).json({ message: "Task not found" });
};
