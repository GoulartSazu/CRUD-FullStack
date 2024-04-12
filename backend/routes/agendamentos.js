import express from "express";
import {
  addAgendamento,
  deleteUser,
  getAgendamentos,
  updateUser,
} from "../controllers/agendamento.js";

const router = express.Router();

router.get("/getAgendamentos", getAgendamentos);

router.post("/", addAgendamento);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
