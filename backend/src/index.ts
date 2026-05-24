import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";
import corsMiddleware from "./corsConfig"; 

import login from "./routes/AuthRoutes";
import regist from "./routes/CompetitionRoutes";
import adminRoutes from "./routes/AdminRoutes";
import eventRoutes from "./routes/EventRoutes";
import adminEventCrudRoutes from "./routes/AdminEventCrudRoutes";


const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());

// GANTI KE 3005 AGAR TIDAK BENTROK
const PORT = 3005; 

app.get("/", (_req, res) => {
  res.send({ message: "API Invofest is working" });
});

app.use("/auth", login);
app.use("/nim-auth", require("./routes/NimAuthRoutes").default);
app.use("/competition", regist);
app.use("/admin", adminRoutes);
app.use("/admin-crud", adminEventCrudRoutes);
app.use("/event", eventRoutes);



// Jalankan Server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 Server Backend Berhasil Dijalankan!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`=========================================`);
});

export default app;