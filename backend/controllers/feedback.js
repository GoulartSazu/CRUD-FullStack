import { db } from "../db.js";

export const getFeedbacks = (_, res) => {
  const q = "SELECT * FROM feedbacks order by date_insert desc";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addFeedback = (req, res) => {
  const message = req.body.fdb_message;
  const placa = req.body.fdb_placa;
  const hash = req.body.fdb_hash;
  const stars = req.body.fdb_stars;

  const queryInsert =
    "INSERT INTO feedbacks(`fdb_message`, `fdb_placa`, `fdb_stars`, `fdb_hash`) VALUES(?)";

  const values = [message, placa, stars, hash];

  db.query(queryInsert, [values], (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res
      .status(200)
      .json("Obrigado pela sua avaliação!");
  });
};
