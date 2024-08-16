import express from "express";
import { deleteUser, getUsers, ubahRole } from "../controller/users.js";

const router = express.Router();

router.get("/users", getUsers);
router.patch("/users/:id", ubahRole);
router.delete("/users/:id", deleteUser);

export default router;
