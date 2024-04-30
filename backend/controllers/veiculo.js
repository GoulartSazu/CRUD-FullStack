import { db } from "../db.js";
import { promisify } from "util";
const queryAsync = promisify(db.query).bind(db);

export const getVeiculos = (_, res) => {
  const q = "SELECT * FROM veiculos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

async function obterQuantidadeAgendamentos(veiculoId) {
  const queryQtdAgendamentos = `SELECT COUNT(*) AS qtdAgendamentos FROM agendamentos WHERE age_id_veiculo = ${veiculoId}`;
  try {
    const results = await queryAsync(queryQtdAgendamentos);

    if (results.length > 0) {
      return parseInt(results[0].qtdAgendamentos);
    } else {
      return 0;
    }
  } catch (error) {
    throw error;
  }
}

export const addVeiculo = (req, res) => {
  const placa = req.body.vei_placa;
  const phone = req.body.vei_telefone_dono;
  const nome = req.body.vei_nome_dono;
  const atualizar = req.body.atualizar;

  const queryCheckPlaca =
    "SELECT id FROM veiculos WHERE vei_placa = ? and vei_telefone_dono = ? and vei_nome_dono = ? ";
  db.query(queryCheckPlaca, [placa, phone, nome], async (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (results.length > 0) {
      const veiculoId = results[0].id;
      let qtdAgendamentos = 0;
      qtdAgendamentos = await obterQuantidadeAgendamentos(veiculoId);

      return res
        .status(200)
        .json([
          "Parabéns, você está participando do programa de fidelidade!",
          qtdAgendamentos,
        ]);
    } else {
      if (!atualizar) {
        const queryCheckVeiculo = "SELECT * FROM veiculos WHERE vei_placa = ?";
        db.query(queryCheckVeiculo, [placa], (err, results) => {
          if (err) {
            return res.status(500).json(err);
          }
          if (results.length > 0) {
            return res
              .status(200)
              .json([
                `Já existe um veículo cadastrado com a placa ${placa} porém dados diferentes.`,
                -1,
                results[0].id,
              ]);
          }

          // Se não existir, proceder com a inserção
          const queryInsert =
            "INSERT INTO veiculos(`vei_placa`, `vei_free_servicos`, `vei_nome_dono`, `vei_telefone_dono`) VALUES(?)";

          const values = [placa, 0, nome, phone];

          db.query(queryInsert, [values], (err) => {
            if (err) {
              return res.status(500).json(err);
            }

            return res
              .status(200)
              .json([
                "Parabéns, você está participando do programa de fidelidade!",
                1,
              ]);
          });
        });
      }
    }
  });
};

export const updateVeiculo = async (req, res) => {
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");
  let qtdAgendamentos = 0;
  const queryUpdate =
    "UPDATE veiculos SET `vei_placa` = ?, `vei_nome_dono` = ?, `vei_telefone_dono` = ?, `date_update` = ? WHERE `id` = ?";

  const values = [
    req.body.vei_placa,
    req.body.vei_nome_dono,
    req.body.vei_telefone_dono,
    today,
  ];

  if (req.body.vei_id > 0) {
    qtdAgendamentos = await obterQuantidadeAgendamentos(req.body.vei_id);

    return res
      .status(200)
      .json([
        "Parabéns, você está participando do programa de fidelidade!",
        qtdAgendamentos,
      ]);
  }

  qtdAgendamentos = await obterQuantidadeAgendamentos(req.params.id);
  db.query(queryUpdate, [...values, req.params.id], (err) => {

    if (err) return res.json(err);

    return res.status(200).json(["Veículo atualizado com sucesso.", qtdAgendamentos]);
  });
};

export const deleteVeiculo = (req, res) => {
  const q = "DELETE FROM veiculos WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Veículo deletado com sucesso.");
  });
};
