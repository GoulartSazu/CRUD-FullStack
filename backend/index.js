import express from "express";
import agendamentoRoutes from "./routes/agendamentos.js";
import veiculoRoutes from "./routes/veiculos.js";
import feedbackRoutes from "./routes/feedbacks.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.use("api/agendamento", agendamentoRoutes);
app.use("api/veiculo", veiculoRoutes);
app.use("api/feedback", feedbackRoutes);

app.listen(8800);
