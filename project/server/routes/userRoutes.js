import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { getUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";
import { updateUserValidator } from "../validators/userValidator.js";
import validateRequest from "../middleware/validationMiddleware.js";

const router = express.Router();

router.use(authenticate);

router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserValidator, validateRequest, updateUser);
router.delete("/:id", deleteUser);

export default router;
