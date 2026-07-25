import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";
import { protect } from "./middleware/authMiddleware";
import leadRoutes from "./routes/leadRoutes";
import activityRoutes from "./routes/activityRoutes";
import noteRoutes from "./routes/noteRoutes";

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Lead Management API Running"
  });
});

app.use("/api/auth", authRoutes);

app.get("/api/profile", protect, (req, res) => {
  res.json({
    message: "Protected Route",
  });
});

app.use("/api/leads", leadRoutes);

app.use("/api/notes", noteRoutes);

app.use("/api/activity", activityRoutes);

export default app;