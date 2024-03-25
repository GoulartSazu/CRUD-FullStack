import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Confirmation, Button } from "./Styles.js";
import { toast } from "react-toastify";
import { Container } from "../../styles/global";
const { format } = require("date-fns");
const getCurrentDateTime = () => format(new Date(), "yyyy-MM-dd HH:mm:ss");

const ConfirmationModal = ({ data }) => {
  function formatInfo(string) {
    if (string === "LAVAGEMCOMPLETA") {
      return "LAVAGEM COMPLETA";
    }
    if (string === "INTERNA") {
      return "LIMPEZA INTERNA";
    }
    if (string === "APARENCIA") {
      return "LAVAGEM EXTERNA (APARENCIA)";
    }
    if (string === "MEDIO") {
      return "MÉDIO";
    }
    if (string === "ESPACOSPLASH") {
      return "ESPAÇO SPLASH";
    }
    if (string === "LEVATRAS") {
      return "LEVA E TRÁS";
    }
    if (string === "10H") {
      return "10 HORAS DA MANHÃ";
    }
    if (string === "08H") {
      return "08 HORAS DA MANHÃ";
    }
    if (string === "13H") {
      return "13 HORAS DA TARDE";
    }
    if (string === "15H") {
      return "15 HORAS DA TARDE";
    }
    return string;
  }

  const finishAgendamento = async () => {

    console.log(data.agendamentoDateValue);
    console.log(data.service);
    console.log(data.car);
    console.log(data.local);
    console.log(data.time);
    if (56 + 66 === 2) {
      await axios
        .post("http://localhost:8800", {
          usr_nome: "Ponta Grossa",
          usr_email: "Ponta Grossa",
          usr_fone: "Ponta Grossa",
          usr_cidade: "Ponta Grossa",
          usr_bairro: "Uvaranas",
          usr_rua: "Jaguapitã",
          usr_numero: 545,
          usr_data_nascimento: "Ponta Grossa",
          date_insert: getCurrentDateTime(),
          date_update: getCurrentDateTime(),
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }
  };

  return (
    <Container>
      <Confirmation>
        <h2>Podemos realizar a confirmação?</h2>
        <h3>
          Serviço selecionado<i className="fas fa-angle-right"></i>{" "}
          <span>{formatInfo(data.service.toUpperCase())}</span>
        </h3>
        <h3>
          Tamanho do seu veículo<i className="fas fa-angle-right"></i>{" "}
          <span>{formatInfo(data.car.toUpperCase())}</span>
        </h3>
        <h3>
          Local escolhido<i className="fas fa-angle-right"></i>{" "}
          <span>{formatInfo(data.local.toUpperCase())}</span>
        </h3>
        <h3>
          Data do serviço<i className="fas fa-angle-right"></i>{" "}
          <span
            dangerouslySetInnerHTML={{
              __html: data.agendamentoDate.toUpperCase().replace(/\./g, ""),
            }}
          />
        </h3>
        <h3>
          Horário da lavagem<i className="fas fa-angle-right"></i>{" "}
          <span>{formatInfo(data.time.toUpperCase())}</span>
        </h3>
        <h4>VALOR TOTAL R${data.totalPrice},00</h4>
      </Confirmation>
      <Button
        onClick={(e) => {
          e.preventDefault();
          finishAgendamento();
        }}
      >
        CONFIRMAR AGENDAMENTO
      </Button>
    </Container>
  );
};

export default ConfirmationModal;
