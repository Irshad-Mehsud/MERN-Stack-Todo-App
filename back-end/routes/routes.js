import express from "express";
import signup from "../controllers/signup.js";
import login from "../controllers/login.js";
import getUserById from "../controllers/getUser.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// POST routes
router.post("/signup", upload.single("profileImage"), signup);
router.post("/login", login);

// GET user by ID
router.get("/users/:id", getUserById);

export default router;
