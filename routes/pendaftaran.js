import express from "express";
import {
  addPendaftaran,
  getByIdEkskul,
  getPendaftaran,
} from "../controller/pendaftaran.js";
import { privateRoutes } from "../middleware/private.js";

const router = express.Router();

router.get("/pendaftaran", getPendaftaran);
router.get("/pendaftaran/:id", getByIdEkskul);
router.post("/pendaftaran", privateRoutes, addPendaftaran);

export default router;
