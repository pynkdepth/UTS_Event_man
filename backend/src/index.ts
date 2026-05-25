import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import corsMiddleware from "./corsConfig"; 

import login from "./routes/AuthRoutes";
import regist from "./routes/CompetitionRoutes";
import adminRoutes from "./routes/AdminRoutes";
import eventRoutes from "./routes/EventRoutes";
import adminEventCrudRoutes from "./routes/AdminEventCrudRoutes";
import nimAuthRoutes from "./routes/NimAuthRoutes"; 

const app = express();

// Tetap gunakan middleware bawaan proyekmu
app.use(corsMiddleware);
app.use(express.json());

app.get("/", (_req, res) => {
  res.send({ message: "API Invofest is working production mode" });
});

// Routing API Resmi
app.use("/auth", login);
app.use("/nim-auth", nimAuthRoutes); 
app.use("/competition", regist);
app.use("/admin", adminRoutes);
app.use("/admin-crud", adminEventCrudRoutes);
app.use("/event", eventRoutes);

const PORT = process.env.PORT || 3005; 

app.listen(PORT, () => {
  console.log(`🚀 Server Production berjalan di port ${PORT}`);
});

export default app;