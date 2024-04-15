import express from "express";
import agendamentoRoutes from "./routes/agendamentos.js";
import veiculoRoutes from "./routes/veiculos.js";
import feedbackRoutes from "./routes/feedbacks.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/agendamento", agendamentoRoutes);
app.use("/veiculo", veiculoRoutes);
app.use("/feedback", feedbackRoutes);

app.listen(8800);
