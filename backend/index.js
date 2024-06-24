import express from "express";
import agendamentoRoutes from "./routes/agendamentos.js";
import veiculoRoutes from "./routes/veiculos.js";
import feedbackRoutes from "./routes/feedbacks.js";
import cors from "cors";
import { db } from "./db.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/agendamento", agendamentoRoutes);
app.use("/api/veiculo", veiculoRoutes);
app.use("/api/feedback", feedbackRoutes);

// Verificar a conexão com o banco de dados
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to the database.");
});

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});