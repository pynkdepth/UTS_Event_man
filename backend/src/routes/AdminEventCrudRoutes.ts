import express from "express";
import { authAdmin } from "../middlewares/authAdmin";
import {
  // CategoryEvent
  listCategoryEvents,
  createCategoryEvent,
  updateCategoryEvent,
  deleteCategoryEvent,
  // Pembicara
  listPembicara,
  createPembicara,
  updatePembicara,
  deletePembicara,
  // Event
  listEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/AdminEventCrudController";


const router = express.Router();
router.use(authAdmin as any);

// CategoryEvent CRUD
router.get("/category-events", listCategoryEvents);
router.post("/category-events", createCategoryEvent);
router.put("/category-events/:id", updateCategoryEvent);
router.delete("/category-events/:id", deleteCategoryEvent);

// Pembicara CRUD
router.get("/speakers", listPembicara);
router.post("/speakers", createPembicara);
router.put("/speakers/:id", updatePembicara);
router.delete("/speakers/:id", deletePembicara);

// Event CRUD
router.get("/events", listEvents);
router.post("/events", createEvent);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);

export default router;

