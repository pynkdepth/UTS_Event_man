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

// 1. Pasang CORS di posisi paling atas sebelum middleware/routing lain
app.use(corsMiddleware);

// 2. Handle Preflight Request (OPTIONS) secara manual khusus untuk deployment Vercel
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://uts-event-man.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// Middleware JSON
app.use(express.json());

// Base Route untuk mengecek status kesehatan API online
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

// Port menggunakan injector otomatis dari cloud hosting
const PORT = process.env.PORT || 3005; 

app.listen(PORT, () => {
  console.log(`🚀 Server Production berjalan di port ${PORT}`);
});

export default app;