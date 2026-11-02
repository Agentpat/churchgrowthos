import express from "express";

import {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/permissionMiddleware.js";

import permissions from "../config/permissions.js";

const router = express.Router();

// Protect all routes
router.use(protect);

// Create Service
router.post("/", authorize(permissions.SERVICES_CREATE), createService);

// Get All Services
router.get("/", authorize(permissions.SERVICES_VIEW), getServices);

// Get Single Service
router.get("/:id", authorize(permissions.SERVICES_VIEW), getService);

// Update Service
router.put("/:id", authorize(permissions.SERVICES_UPDATE), updateService);

// Delete (Soft Delete) Service
router.delete("/:id", authorize(permissions.SERVICES_DELETE), deleteService);

export default router;
