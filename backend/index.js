import express from "express";
import userRoutes from "./routes/agendamentos.js";
import veiculoRoutes from "./routes/veiculos.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/", userRoutes);
app.use("/", veiculoRoutes);

app.listen(8800);
