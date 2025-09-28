import express from "express";
import { cacheMiddleware } from "../middleware/redisMiddleware.js";
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser, createAdmin
} from "../controllers/userController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createUser);
router.post("/creat-admin", createAdmin);
router.post("/login", loginUser);
router.get("/", cacheMiddleware, getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", requireAuth, updateUser);
router.delete("/:id", deleteUser);

export default router;
