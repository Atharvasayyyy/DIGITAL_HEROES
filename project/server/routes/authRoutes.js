import express from "express";
import { register, login } from "../controllers/authController.js";
import { loginValidator, registerValidator } from "../validators/authValidator.js";
import validateRequest from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);

export default router;
