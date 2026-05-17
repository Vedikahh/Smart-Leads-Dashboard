import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import leadRoutes from "./routes/lead.routes";
import express from "express";
import connectDB from "./config/db";

dotenv.config();

console.log("MONGO_URI =", process.env.MONGO_URI);
connectDB();

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (_, res) => {
    res.json({
        success: true,
        message: "API Running",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
