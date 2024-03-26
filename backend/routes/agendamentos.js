import express from "express";
import {
  addAgendamento,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/agendamento.js";

const router = express.Router();

router.get("/", getUsers);

router.post("/agendamento", addAgendamento);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
