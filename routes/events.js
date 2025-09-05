// routes/events.js
import express from "express";
import * as eventController from "../controllers/eventController.js"; // note .js extension

const router = express.Router();

// Event routes
router.post("/", eventController.createEvent);
router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEventById);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

// Export default for ES modules
export default router;
