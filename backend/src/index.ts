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

// Taruh ini tepat di bawah app.use(corsMiddleware);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://uts-event-man.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
    return;
  }
  next();
});

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