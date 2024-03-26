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

    let totalPrice = 0;

    if (checkService === "lavagemCompleta") {
      totalPrice = 100;
      if (checkCar === "medio") {
        totalPrice = 80;
      }
    }

    if (checkService !== "lavagemCompleta") {
      totalPrice = 60;
      if (checkCar === "medio") {
        totalPrice = 50;
      }
    }

    if (checkLocal === "delivery") {
      totalPrice = totalPrice + 20;
    }

    const data = {
      service: checkService,
      car: checkCar,
      local: checkLocal,
      time: checkTime,
      agendamentoDate: selectedDate,
      agendamentoDateValue: form.age_data.value,
      totalPrice: totalPrice
    };

    setIsModalOpen(true);
    setInfosForm(data);

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
              <span>Leva e Traz</span> <i className="fas fa-angle-right"></i>{" "}
              Iremos buscar seu veículo, realizar o serviçoe levar novamente para você
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
            width: "40%",
            margin: "auto",
            background: "linear-gradient(to bottom right, #5c0a5c, #4b0082)",
            border: "none",
            borderRadius: "10px",
            padding: "40px"
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
