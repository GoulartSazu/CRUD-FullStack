import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM users";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addAgendamento = (req, res) => {
  const queryInsert =
    "INSERT INTO agendamentos(`age_servico`, `age_veiculo`, `age_local`, `age_data`, `age_horario`,  `age_valor_total`,  `age_status`, `age_hash`) VALUES(?)";

  const values = [
    req.body.age_servico,
    req.body.age_veiculo,
    req.body.age_local,
    req.body.age_data,
    req.body.age_horario,
    req.body.age_valor_total,
    "PENDENTE",
    req.body.age_hash
  ];

  db.query(queryInsert, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Agendamento criado com sucesso.");
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
