import axios from "axios";
import React from "react";
import { Confirmation, ButtonConfirm, ButtonVoltar } from "./Styles.js";
import { toast } from "react-toastify";
import { Container } from "../../styles/global";

const ConfirmationAcao = ({ data, onCloseModal, onGetAgendamentos }) => {
  const updateAgendamento = async () => {
    if (!data.id || data.id < 1) {
      return toast.warning("Agendamento não localizado.");
    }

    await axios
      .put("http://localhost:8800/agendamento/" + data.id, {
        age_status: data.acao,
        pw: localStorage.getItem("log"),
      })
      .then(({ data }) => {
        toast.success(data);
        onCloseModal();
        onGetAgendamentos();
      })

      .catch(() =>
        toast.error("Ocorreu um erro, entre em contato com o suporte.")
      );
  };

  return (
    <Container>
      <Confirmation>
        <h2>
          TEM CERTEZA QUE DESEJA <br /> <br />
          <strong className={`${data.acao}`}>{data.acao}</strong> <br />
          <br /> O AGENDAMENTO DE NÚMERO{" "}
          <strong className={`${data.acao}`}>{data.id}</strong> ?
        </h2>
        <div>
          <ButtonConfirm
            className={`mob ${data.acao}`}
            onClick={(e) => {
              e.preventDefault();
              updateAgendamento();
            }}
          >
            SIM, {data.acao}{" "}
            {data.acao === "REPROVAR"
              ? "❌"
              : data.acao === "CANCELAR"
              ? "❗️"
              : "✔️"}
          </ButtonConfirm>
          <ButtonVoltar className="mob" onClick={() => onCloseModal()}>
            NÃO, VOLTAR 🔙
          </ButtonVoltar>
        </div>
      </Confirmation>
    </Container>
  );
};

export default ConfirmationAcao;
