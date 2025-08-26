import express from "express";
import signup from "../controllers/signup.js";
import login from "../controllers/login.js";
import getUserById from "../controllers/getUserById.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import createTask from "../controllers/TaskController.js";
import getTasksByUser from "../controllers/getTask.js";
import getAllTask from "../controllers/getAllTask.js";
import deleteTask from "../controllers/deleteTask.js";
import updateTask from "../controllers/updateTask.js";
import tokenVerification from "../config/tokenVerification.js";
import getAllUsers from "../controllers/getAllUsers.js";
const router = express.Router();

// POST routes
router.post("/signup", upload.single("profileImage"), signup);
router.post("/login", login);
router.post("/tasks", createTask);
router.get("/tasks", getAllTask);

router.get("/users/:userId/tasks", getTasksByUser);

router.delete("/tasks/:id", deleteTask);
router.put("/tasks/:id", updateTask);


// GET user by ID
router.get("/users/:id", tokenVerification , getUserById);

router.get("/users", tokenVerification ,getAllUsers);

export default router;
