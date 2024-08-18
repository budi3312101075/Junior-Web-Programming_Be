import express from "express";
import {
  deleteUser,
  getMe,
  getUsers,
  resetPassword,
  ubahRole,
  updateUser,
} from "../controller/users.js";
import { privateRoutes } from "../middleware/private.js";
import multer from "../middleware/multer.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/getMe", privateRoutes, getMe);
router.patch("/users/:id", ubahRole);
router.patch("/updateProfile", privateRoutes, multer, updateUser);
router.patch("/resetPassword", privateRoutes, resetPassword);
router.delete("/users/:id", deleteUser);

export default router;
