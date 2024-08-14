import express from "express";
import {
  addEkskul,
  deleteEkskul,
  getEkskul,
  updateEkskul,
} from "../controller/ekskul.js";

const router = express.Router();

router.get("/ekskul", getEkskul);
router.post("/ekskul", addEkskul);
router.patch("/ekskul/:id", updateEkskul);
router.delete("/ekskul/:id", deleteEkskul);

export default router;
