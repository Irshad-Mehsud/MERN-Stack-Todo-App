import express from "express";
import signup from "../controllers/signup.js";
import login from "../controllers/login.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/signup", upload.single("profileImage"), signup);
router.post("/login", login);

export default router;
