import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  FormContainer,
  CheckboxButton,
  SelectionContainer,
  InputArea,
  Input,
  Button,
} from "./Styles.js";
import { toast } from "react-toastify";
import { Container } from "../../styles/global";
import ConfirmationModal from "./ConfirmationModal.js";
import Modal from "react-modal"; // Importe a referência ao elemento raiz
const { format } = require("date-fns");
const getCurrentDateTime = () => format(new Date(), "yyyy-MM-dd HH:mm:ss");

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();
  const [checkService, setCheckService] = useState("lavagemCompleta");
  const [checkCar, setCheckCar] = useState(null);
  const [checkLocal, setCheckLocal] = useState(null);
  const [checkTime, setCheckTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [textHours, setTextHours] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [infosForm, setInfosForm] = useState({});

  const handleCheckService = (service) => {
    setCheckService(service === checkService ? null : service);
  };

  const handleCheckCar = (car) => {
    setCheckCar(car === checkCar ? null : car);
  };

  const handleCheckLocal = (local) => {
    setCheckLocal(local === checkLocal ? null : local);
  };

  const handleCheckTime = (time) => {
    setCheckTime(time === checkTime ? null : time);
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const dateParts = selectedDate.split("-");
    const today = new Date();
    const dateObj = new Date(
      Date.UTC(
        parseInt(dateParts[0]),
        parseInt(dateParts[1]) - 1,
        parseInt(dateParts[2]),
        12,
        0,
        0
      )
    );
    const weekDay = dateObj.toLocaleDateString("pt-BR", { weekday: "long" });
    const formattedDate = dateObj.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
    today.setDate(today.getDate() - 2);

    setSelectedDate(
      `Serviço para <strong>${weekDay}</strong> dia <strong>${formattedDate}.</strong>`
    );

    setTextHours(
      `Deseja marcar em qual horário no dia <strong>${formattedDate}?</strong>`
    );

    setWeekDay(weekDay.toUpperCase());

    if (weekDay.toUpperCase() === "DOMINGO") {
      setSelectedDate(`Não trabalhamos aos domingos. 🤨`);
    }

    if (new Date(selectedDate).getTime() < today.getTime()) {
      setSelectedDate(`Não é possível agendar em dias do passado. 🤨`);
    }
  };

  useEffect(() => {
    if (onEdit) {
      const form = ref.current;
      form.age_data.value = onEdit.age_data;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = ref.current;

    if (!form.age_data.value) {
      return toast.warn("Por favor, selecione uma data!");
    }

    if (!checkCar) {
      return toast.warn("Por favor, selecione o tamanho do seu veículo!");
    }

    if (!checkLocal) {
      return toast.warn("Por favor, selecione o local do serviço!");
    }

    if (!checkTime) {
      return toast.warn("Por favor, selecione o horário!");
    }

    if (!checkService) {
      return toast.warn("Por favor, selecione qual o tipo de serviço!");
    }

    if (selectedDate.includes("passado")) {
      return toast.warn("Data passada não permitida!");
    }

    const data = {
      service: checkService,
      car: checkCar,
      local: checkLocal,
      time: checkTime,
      agendamentoDate: form.age_data.value,
    };

    setIsModalOpen(true);
    setInfosForm(data);

    return;

    // if (onEdit) {
    //   await axios
    //     .put("http://localhost:8800/" + onEdit.id, {
    //       usr_nome: form.usr_nome.value,
    //       usr_email: form.usr_email.value,
    //       usr_fone: form.usr_fone.value,
    //       usr_cidade: "Ponta Grossa",
    //       usr_bairro: "Uvaranas",
    //       usr_rua: "Jaguapitã",
    //       usr_numero: 545,
    //       usr_data_nascimento: form.usr_data_nascimento.value,
    //       date_insert: getCurrentDateTime(),
    //       date_update: getCurrentDateTime(),
    //     })
    //     .then(({ data }) => toast.success(data))
    //     .catch(({ data }) => toast.error(data));
    // } else {
    //   await axios
    //     .post("http://localhost:8800", {
    //       usr_nome: form.usr_nome.value,
    //       usr_email: form.usr_email.value,
    //       usr_fone: form.usr_fone.value,
    //       usr_cidade: "Ponta Grossa",
    //       usr_bairro: "Uvaranas",
    //       usr_rua: "Jaguapitã",
    //       usr_numero: 545,
    //       usr_data_nascimento: form.usr_data_nascimento.value,
    //       date_insert: getCurrentDateTime(),
    //       date_update: getCurrentDateTime(),
    //     })
    //     .then(({ data }) => toast.success(data))
    //     .catch(({ data }) => toast.error(data));
    // }

    // form.usr_nome.value = "";
    // form.usr_email.value = "";
    // form.usr_fone.value = "";
    // form.usr_data_nascimento.value = "";

    // setOnEdit(null);
    // getUsers();
  };

  return (
    <Container>
      <FormContainer ref={ref} onSubmit={handleSubmit}>
        <div className="section">
          <h3>Serviço</h3>
          <p>Qual serviço deseja contratar?</p>
          <SelectionContainer>
            <CheckboxButton
              checked={checkService === "lavagemCompleta"}
              onClick={(e) => {
                e.preventDefault();
                handleCheckService("lavagemCompleta");
              }}
            >
              <span>Lavagem Completa</span>{" "}
              <i className="fas fa-angle-right"></i> Interna e externa
            </CheckboxButton>
            <CheckboxButton
              checked={checkService === "aparencia"}
              onClick={(e) => {
                e.preventDefault();
                handleCheckService("aparencia");
              }}
            >
              <span>Aparência</span> <i className="fas fa-angle-right"></i>{" "}
              Lavagem externa
            </CheckboxButton>
            <CheckboxButton
              checked={checkService === "interna"}
              onClick={(e) => {
                e.preventDefault();
                handleCheckService("interna");
              }}
            >
              <span>Interna</span> <i className="fas fa-angle-right"></i>{" "}
              Limpeza interna
            </CheckboxButton>
          </SelectionContainer>
        </div>

        <div className="section">
          <h3>Veículo</h3>
          <p>Qual o tamanho do seu veículo?</p>
          <SelectionContainer>
            <CheckboxButton
              checked={checkCar === "medio"}
              className="car"
              onClick={(e) => {
                e.preventDefault();
                handleCheckCar("medio");
              }}
            >
              <span>Médio</span> <i className="fas fa-angle-right"></i> HB20,
              Celta, Onix, Kwid, Sandero, Corsa
            </CheckboxButton>
            <CheckboxButton
              checked={checkCar === "grande"}
              className="car"
              onClick={(e) => {
                e.preventDefault();
                handleCheckCar("grande");
              }}
            >
              <span>Grande</span> <i className="fas fa-angle-right"></i> S10,
              Montana, Amarok, Ranger, Hilux, Strada
            </CheckboxButton>
          </SelectionContainer>
        </div>

        <div className="section">
          <h3>Local</h3>
          <p>Qual local seria o serviço?</p>
          <SelectionContainer>
            <CheckboxButton
              checked={checkLocal === "delivery"}
              onClick={(e) => {
                e.preventDefault();
                handleCheckLocal("delivery");
              }}
            >
              <span>Delivery</span> <i className="fas fa-angle-right"></i>{" "}
              Iremos até o local do seu veículo para realizar o serviço
            </CheckboxButton>
            <CheckboxButton
              checked={checkLocal === "espacoSplash"}
              onClick={(e) => {
                e.preventDefault();
                handleCheckLocal("espacoSplash");
              }}
            >
              <span>Espaco Splash</span> <i className="fas fa-angle-right"></i>{" "}
              Você irá trazer seu veículo em nosso endereço
            </CheckboxButton>
            <CheckboxButton
              checked={checkLocal === "levaTras"}
              onClick={(e) => {
                e.preventDefault();
                handleCheckLocal("levaTras");
              }}
            >
              <span>Leva e Trás</span> <i className="fas fa-angle-right"></i>{" "}
              Iremos buscar seu veículo, realizar e levar novamente para você
            </CheckboxButton>
          </SelectionContainer>
        </div>

        <div className="section">
          <h3>Data</h3>
          <p>Para qual dia será o serviço?</p>
          <InputArea>
            <Input name="age_data" type="date" onChange={handleDateChange} />
            {selectedDate && (
              <p dangerouslySetInnerHTML={{ __html: selectedDate }} />
            )}
          </InputArea>
        </div>

        <div className="section">
          <h3>Horário</h3>
          {textHours ? (
            <p dangerouslySetInnerHTML={{ __html: textHours }} />
          ) : (
            <p>Qual horário deseja?</p>
          )}
          <SelectionContainer>
            <CheckboxButton
              className="h"
              checked={checkTime === "8h"}
              onClick={(e) => {
                e.preventDefault();
                handleCheckTime("8h");
              }}
            >
              <span>8h</span>
            </CheckboxButton>
            <CheckboxButton
              className="h"
              checked={checkTime === "10h"}
              onClick={(e) => {
                e.preventDefault();
                handleCheckTime("10h");
              }}
            >
              <span>10h</span>
            </CheckboxButton>
            {weekDay !== "SÁBADO" && (
              <CheckboxButton
                className="h"
                checked={checkTime === "13h"}
                onClick={(e) => {
                  e.preventDefault();
                  handleCheckTime("13h");
                }}
              >
                <span>13h</span>
              </CheckboxButton>
            )}
            {weekDay !== "SÁBADO" && (
              <CheckboxButton
                className="h"
                checked={checkTime === "15h"}
                onClick={(e) => {
                  e.preventDefault();
                  handleCheckTime("15h");
                }}
              >
                <span>15h</span>
              </CheckboxButton>
            )}
          </SelectionContainer>
        </div>
        <Button type="submit" disabled={weekDay === "DOMINGO"}>
          AGENDAR
        </Button>
      </FormContainer>
      <Modal
        style={{
          overlay: {
            backgroundColor: "rgba(255, 255, 255, 0.5)"
          },
          content: {
            width: "50%",
            margin: "auto"
          },
        }}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <ConfirmationModal data={infosForm} />
      </Modal>
    </Container>
  );
};

export default Form;
