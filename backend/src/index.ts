import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Database connection error:", err));
  