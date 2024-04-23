import express from "express";
import {
  addAgendamento,
  deleteUser,
  getAgendamentos,
  updateAgendamento,
} from "../controllers/agendamento.js";

const router = express.Router();

router.get("/getAgendamentos", getAgendamentos);

router.post("/", addAgendamento);

router.put("/:id", updateAgendamento);

router.delete("/:id", deleteUser);

export default router;
