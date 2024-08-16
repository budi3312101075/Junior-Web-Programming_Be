import express from "express";
import {
  addPendaftaran,
  approvePendaftaran,
  deletePendaftaran,
  disApprovePendaftaran,
  getByIdEkskul,
  getPendaftaran,
  riwayatPendaftaran,
} from "../controller/pendaftaran.js";
import { privateRoutes } from "../middleware/private.js";

const router = express.Router();

router.get("/pendaftaran", getPendaftaran);
router.get("/pendaftaran/:id", getByIdEkskul);
router.get("/riwayatPendaftaran", privateRoutes, riwayatPendaftaran);
router.post("/pendaftaran", privateRoutes, addPendaftaran);
router.delete("/pendaftaran/:id", privateRoutes, deletePendaftaran);
router.patch("/approve/:id", privateRoutes, approvePendaftaran);
router.patch("/disApprove/:id", privateRoutes, disApprovePendaftaran);

export default router;
