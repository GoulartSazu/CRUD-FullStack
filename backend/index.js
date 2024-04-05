import express from "express";
import agendamentoRoutes from "./routes/agendamentos.js";
import veiculoRoutes from "./routes/veiculos.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/agentamento", agendamentoRoutes);
app.use("/veiculo", veiculoRoutes);

app.listen(8800);
