import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM users";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
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
  const placa = req.body.vei_placa;
  let veiculoId = null;

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

    // Se não existir, proceder com a inserção
    const queryInsert =
      "INSERT INTO agendamentos(`age_servico`, `age_id_veiculo`,`age_tamanho_veiculo`, `age_local`, `age_data`, `age_horario`,  `age_valor_total`,  `age_status`, `age_hash`) VALUES(?)";

    const values = [
      req.body.age_servico,
      veiculoId,
      req.body.age_veiculo,
      req.body.age_local,
      req.body.age_data,
      req.body.age_horario,
      req.body.age_valor_total,
      "PENDENTE",
      hash,
    ];

    db.query(queryInsert, [values], (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (veiculoId) {
        updateQtdServicos(veiculoId);
      }

      return res.status(200).json("Agendamento criado com sucesso.");
    });
  });
};

export const updateUser = (req, res) => {
  const queryUpdate =
    "UPDATE users SET `usr_nome` = ?, `usr_email` = ?, `usr_fone` = ?, `usr_data_nascimento` = ?, `date_update` = ? WHERE `id` = ?";

  const values = [
    req.body.usr_nome,
    req.body.usr_email,
    req.body.usr_fone,
    req.body.usr_data_nascimento,
    req.body.date_update,
  ];

  db.query(queryUpdate, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM users WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};
