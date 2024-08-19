import express from "express";
import {
  addEkskul,
  deleteEkskul,
  getEkskul,
  statusPendaftaran,
  updateEkskul,
} from "../controller/ekskul.js";

const router = express.Router();

router.get("/ekskul", getEkskul);
router.post("/ekskul", addEkskul);
router.patch("/ekskul/:id", updateEkskul);
router.patch("/statusEkskul/:id", statusPendaftaran);
router.delete("/ekskul/:id", deleteEkskul);

export default router;
