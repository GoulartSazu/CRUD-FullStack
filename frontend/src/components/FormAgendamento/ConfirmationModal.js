import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Confirmation, Button } from "./Styles.js";
import { toast } from "react-toastify";
import { Container } from "../../styles/global";

const ConfirmationModal = ({ data }) => {
  const [free, setFree] = useState("Não participando.");
  const navigate = useNavigate();

  useEffect(() => {
    if (data.fidelidade) {
      setFree(data.fidelidade);
    }
  }, [data.fidelidade]);

  function formatInfo(string, zap) {
    if (zap) {
      if (string === "LAVAGEMCOMPLETA") {
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
    const hashService = `%0A%0A🔹%20Serviço:%20*${formatInfo(
      data.service.toUpperCase(),
      true
    )}*%20`;
    const hashLocal = `%0A%0A🔹%20Local:%20*${formatInfo(
      data.local.toUpperCase(),
      true
    )}*%20`;
    const hashEndereco = data.endereco
      ? `%0A%0A🔹%20Endereço:%20*${data.endereco.toUpperCase()}*%20`
      : "";
    const hashVeiculo = `%0A%0A🔹%20Veículo:%20*${formatInfo(
      data.car.toUpperCase(),
      true
    )}*%20`;
    const hashDate = `%0A%0A🔹%20Data:%20*${data.agendamentoDateValue
      .split("-")
      .reverse()
      .join("-")}*%20`;
    const hashTime = `%0A%0A🔹%20Horário:%20*${formatInfo(
      data.time.toUpperCase(),
      true
    )}*%20`;
    const qtdServico = data.qtdFidelidade
      ? `%0A%0A🔹%20Serviço%20de%20Número:%20*${data.qtdFidelidade}*%20`
      : "";
    const hashPrice = `%0A%0A🔹%20*Valor%20Total%20R$%20${data.totalPrice},00*`;
    const hash =
      hashService +
      hashLocal +
      hashEndereco +
      hashVeiculo +
      hashDate +
      hashTime +
      qtdServico +
      hashPrice;
    localStorage.setItem("placa", data.placa ?? "-");
    localStorage.setItem("hash", hash);
    await axios
      .post("https://splashpg.com.br/api/agendamento", {
        age_servico: data.service.toUpperCase(),
        age_veiculo: data.car.toUpperCase(),
        age_local: data.local.toUpperCase(),
        age_data: data.agendamentoDateValue + " 00:00:00",
        age_horario: data.time.toUpperCase(),
        age_valor_total: data.totalPrice,
        age_endereco: data.endereco,
        age_hash: hash.replace(/🔹/g, ""),
        vei_placa: data.placa,
        vei_telefone: data.telefone,
        vei_nome: data.nome,
        vei_free_servicos: free.toUpperCase().includes("PARABÉNS!")
          ? 1
          : 0,
      })
      .then(({ data }) => {
        toast.success(data);
        setTimeout(() => {
          toast.success("Você será direcionado em 3");
        }, 1000);

        setTimeout(() => {
          toast.success("Você será direcionado em 2");
        }, 2000);

        setTimeout(() => {
          toast.success("Você será direcionado em 1");
          setTimeout(() => {
            navigate("/finalizacao");
          }, 1000);
        }, 3000);
      })

      .catch(({ response }) => toast.error(response.data));
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
        <h3>
          Programa Fidelidade<i className="fas fa-angle-right"></i>{" "}
          <span>
            {free.toUpperCase() ?? `LAVAGEM DE NÚMERO ${data.fidelidade}`}
          </span>
        </h3>
        <h4>VALOR TOTAL R${data.totalPrice},00</h4>
        <p>
          *Sujeito a mudanças de valores de acordo com a localização e veículos
          de altos padrões. Cancelamento sem custos até 12 horas antes do
          serviço, após isso será cobrado uma taxa de 30% do preço total.
        </p>
      </Confirmation>
      <Button
        className="mob"
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
