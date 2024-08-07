import { db } from "../db.js";
import moment from "moment";

const formatDate = (dateString, hours = false) => {
  const date = new Date(dateString);
  if (hours) return date.toLocaleString("pt-BR");
  return date.toLocaleDateString("pt-BR");
};

export const getUsers = (_, res) => {
  const q = "SELECT * FROM users";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const getAgendamentos = (_, res) => {
  const q = `SELECT 
  ag.id AS id,
  v.vei_placa AS veiculo_placa,
  v.id AS veiculo_id,
  v.vei_nome_dono AS nome_dono_veiculo,
  v.vei_telefone_dono AS telefone_dono_veiculo,
  v.vei_free_servicos AS free_servicos,
  age_servico AS servico,
  age_tamanho_veiculo AS tamanho_veiculo,
  age_local AS local,
  age_free_servico AS free_servico,
  age_data AS data_agendamento,
  age_horario AS horario_agendamento,
  age_valor_total AS valor_total,
  age_endereco AS endereco,
  age_status AS status,
  ag.date_insert as date_insert,
  (SELECT COUNT(*)
     FROM agendamentos
    WHERE age_id_veiculo = v.id
      AND age_status = 'PENDENTE') AS qtd_agendamentos_pendentes,
      (SELECT COUNT(*)
      FROM agendamentos
     WHERE age_id_veiculo = v.id
       AND age_status = 'FINALIZADO') AS qtd_agendamentos_finalizados,
  (SELECT COUNT(*)
     FROM agendamentos
    WHERE age_id_veiculo = v.id
      AND age_status = 'APROVADO') AS qtd_agendamentos_aprovados,
  (SELECT COUNT(*)
     FROM agendamentos
    WHERE age_id_veiculo = v.id
      AND age_status = 'REPROVADO') AS qtd_agendamentos_reprovados,
  (SELECT COUNT(*)
     FROM agendamentos
    WHERE age_id_veiculo = v.id) AS qtd_agendamentos_total
     FROM agendamentos ag
     LEFT JOIN veiculos v 
       ON v.id = ag.age_id_veiculo
    ORDER BY 
    CASE 
        WHEN ag.age_status = 'PENDENTE' THEN 1
        WHEN ag.age_status = 'APROVADO' THEN 2
        WHEN ag.age_status = 'FINALIZADO' THEN 3
        WHEN ag.age_status = 'REPROVADO' THEN 4
        WHEN ag.age_status = 'CANCELADO' THEN 5
        ELSE 5 
    END, ag.age_data`;

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    // Formatar a data antes de enviar para o frontend
    const formatted = data.map((item) => ({
      ...item,
      data_agendamento: moment(item.data_agendamento).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      date_insert: moment(item.date_insert).format("YYYY-MM-DD HH:mm:ss"),
    }));

    return res.status(200).json(formatted);
  });
};

function updateQtdServicos(veiculoId) {
  const updateQtdServico = `UPDATE veiculos set vei_free_servicos = vei_free_servicos + 1  WHERE id = ?`;
  db.query(updateQtdServico, [veiculoId], (err) => {
    if (err) return res.json(err);
  });
}

export const addAgendamento = (req, res) => {
  const hash = req.body.age_hash;
  const horario = req.body.age_horario;
  const data = req.body.age_data;
  const placa = req.body.vei_placa;
  let veiculoId = null;
  let local = ["LEVATRAS", "ESPACOSPLASH"];

  if (req.body.age_local === "DELIVERY") {
    local = [req.body.age_local];
  }

  if (placa) {
    const queryCheckPlaca = "SELECT id FROM veiculos WHERE vei_placa = ? ";
    db.query(queryCheckPlaca, [placa], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (results.length > 0) {
        veiculoId = results[0].id;
      }
    });
  }

  const queryCheckHash = "SELECT * FROM agendamentos WHERE age_hash = ?";
  db.query(queryCheckHash, [hash], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    // Se já existir um registro com o mesmo hash, retornar uma mensagem de erro
    if (results.length > 0) {
      return res
        .status(400)
        .json("Já existe um agendamento com todos esses mesmos dados.");
    }

    const queryCheckTime =
      "SELECT * FROM agendamentos WHERE age_data = ? and age_horario = ? and age_status in ('PENDENTE', 'APROVADO') and age_local in (?)";
    db.query(queryCheckTime, [data, horario, local], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      // Se já existir um registro com o mesmo hash, retornar uma mensagem de erro
      if (results.length > 0) {
        return res
          .status(400)
          .json(
            `Desculpe, horário de ${horario.toLowerCase()} no dia ${formatDate(
              data
            )} está reservado. Por favor escolha outro horário.`
          );
      }

      const queryInsert =
        "INSERT INTO agendamentos(`age_servico`, `age_id_veiculo`,`age_tamanho_veiculo`, `age_local`, `age_data`, `age_horario`,  `age_valor_total`,  `age_status`, `age_free_servico`, `age_endereco`, `age_hash`) VALUES(?)";

      const values = [
        req.body.age_servico,
        veiculoId,
        req.body.age_veiculo,
        req.body.age_local,
        req.body.age_data,
        req.body.age_horario,
        req.body.age_valor_total,
        "PENDENTE",
        req.body.vei_free_servicos,
        req.body.age_endereco,
        hash,
      ];

      db.query(queryInsert, [values], (err) => {
        if (err) {
          return res.status(500).json(err);
        }

        if (veiculoId) {
          updateQtdServicos(veiculoId);
        }

        return res.status(200).json("Agendamento realizado com sucesso!");
      });
    });
  });
};

export const updateAgendamento = (req, res) => {
  const queryUpdate =
    "UPDATE agendamentos SET `age_status` =  ? WHERE `id` = ?";

  if (req.body.pw !== "PÃO DA VÓ") {
    return res
      .status(400)
      .json("Usuário sem permissão para atualizar agendamento.");
  }

  const status =
    req.body.age_status === "APROVAR"
      ? "APROVADO"
      : req.body.age_status === "CANCELAR"
      ? "CANCELADO"
      : req.body.age_status === "REPROVAR"
      ? "REPROVADO"
      : req.body.age_status === "FINALIZAR"
      ? "FINALIZADO"
      : "PENDENTE";

  db.query(queryUpdate, [...[status], req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Agendamento " + status + " com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM users WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};
