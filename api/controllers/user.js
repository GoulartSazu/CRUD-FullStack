import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM users";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const queryInsert =
    "INSERT INTO users(`usr_nome`, `usr_email`, `usr_fone`, `usr_cidade`, `usr_bairro`,  `usr_rua`,  `usr_numero`, `usr_data_nascimento`, date_insert, date_update ) VALUES(?)";

  const values = [
    req.body.usr_nome,
    req.body.usr_email,
    req.body.usr_fone,
    req.body.usr_cidade,
    req.body.usr_bairro,
    req.body.usr_rua,
    req.body.usr_numero,
    req.body.usr_data_nascimento,
    req.body.date_insert,
    req.body.date_update,
  ];

  db.query(queryInsert, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
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
