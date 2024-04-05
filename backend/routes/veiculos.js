import express from "express";
import {
  addVeiculo,
  deleteVeiculo,
  getVeiculos,
  updateVeiculo,
} from "../controllers/veiculo.js";

const router = express.Router();

router.get("/getVeiculos", getVeiculos);

router.post("/", addVeiculo);

router.put("/:id", updateVeiculo);

router.delete("/:id", deleteVeiculo);

export default router;
