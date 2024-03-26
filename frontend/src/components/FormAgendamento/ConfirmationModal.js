import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Confirmation, Button } from "./Styles.js";
import { toast } from "react-toastify";
import { Container } from "../../styles/global";
const { format } = require("date-fns");
const getCurrentDateTime = () => format(new Date(), "yyyy-MM-dd HH:mm:ss");

const ConfirmationModal = ({ data }) => {
  function formatInfo(string, zap) {
    console.log(string, zap, 'kkk')
    if (zap) {
      if (string === "LAVAGEMCOMPLETA" ) {
        console.log("kkkkk")
        return "LAVAGEM%20COMPLETA";
      }
      if (string === "LEVATRAS") {
        return "LEVA%20E%20TRAZ";
      }
      if (string === "INTERNA") {
        return "LIMPEZA%20INTERNA";
      }
      if (string === "APARENCIA") {
        return "LAVAGEM%20EXTERNA%20(APARÊNCIA)";
      }
      if (string === "ESPACOSPLASH") {
        return "ESPAÇO%20SPLASH";
      }
      if (string === "10H") {
        return "10%20HORAS%20DA%20MANHÃ";
      }
      if (string === "08H") {
        return "08%20HORAS%20DA%20MANHÃ";
      }
      if (string === "13H") {
        return "13%20HORAS%20DA%20TARDE";
      }
      if (string === "15H") {
        return "15%20HORAS%20DA%20TARDE";
      }
    }
    if (string === "LAVAGEMCOMPLETA") {
      return "LAVAGEM COMPLETA";
    }
    if (string === "INTERNA") {
      return "LIMPEZA INTERNA";
    }
    if (string === "APARENCIA") {
      return "LAVAGEM EXTERNA (APARÊNCIA)";
    }
    if (string === "MEDIO") {
      return "MÉDIO";
    }
    if (string === "ESPACOSPLASH") {
      return "ESPAÇO SPLASH";
    }
    if (string === "LEVATRAS") {
      return "LEVA E TRAZ";
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
    const hashService = `serviço%20*${formatInfo(data.service.toUpperCase(), true)}*,%20`;
    const hashLocal = `local:%20*${formatInfo(data.local.toUpperCase(), true)}*,%20`;
    const hashVeiculo = `veículo:%20*${formatInfo(data.car.toUpperCase(), true)}*,%20`;
    const hashDate = `data:%20*${data.agendamentoDateValue.split("-").reverse().join("-")}*,%20`;
    const hashTime = `no%20horário%20de%20*${formatInfo(data.time.toUpperCase(), true)}.*%20`;
    const hashPrice = `*Valor%20Total%20R$%20${data.totalPrice},00*`;
    const hash = hashService + hashLocal + hashVeiculo + hashDate + hashTime + hashPrice;
    console.log("https://api.whatsapp.com/send?phone=554299858888&text=Olá.%20Gostaria%20de%20contratar%20o%20"+hash)
    await axios
      .post("http://localhost:8800/agendamento", {
        age_servico: data.service.toUpperCase(),
        age_veiculo: data.car.toUpperCase(),
        age_local: data.local.toUpperCase(),
        age_data: data.agendamentoDateValue + " 00:00:00",
        age_horario: data.time.toUpperCase(),
        age_valor_total: data.totalPrice,
        age_hash: hash
      })
      .then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data));
    
  };

  return (
    <Container>
      <Confirmation>
        <h2>Podemos realizar a confirmação? 🧼</h2>
        <h3>
          Serviço selecionado<i className="fas fa-angle-right"></i>{" "}
          <span>{formatInfo(data.service.toUpperCase(), false)}</span>
        </h3>
        <h3>
          Tamanho do seu veículo<i className="fas fa-angle-right"></i>{" "}
          <span>{formatInfo(data.car.toUpperCase(), false)}</span>
        </h3>
        <h3>
          Local escolhido<i className="fas fa-angle-right"></i>{" "}
          <span>{formatInfo(data.local.toUpperCase(), false)}</span>
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
          <span>{formatInfo(data.time.toUpperCase(), false)}</span>
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
