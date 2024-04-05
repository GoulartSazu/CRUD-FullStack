import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  FormContainer,
  CheckboxButton,
  SelectionContainer,
  InputArea,
  Input,
  Button,
  InputContainer,
  InputAreaName,
  ButtonParticipar,
  InputAreaDate,
  InputAreaYesNot,
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
  const [contentWidth, setContentWidth] = useState("40%");
  const [active, setActive] = useState("PARTICIPAR");
  const [fidelidade, setFidelidade] = useState("");
  const [agendamento, setAgendamento] = useState(false);
  const [yesNot, setYesNot] = useState({
    show: false,
    update: false,
    veiculoId: null,
  });

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 950) {
        setContentWidth("inherit");
      } else {
        setContentWidth("40%");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = ref.current;

    if (!agendamento) {
      if (form.vei_placa.value) {
        if (!form.vei_nome.value || !form.vei_telefone.value) {
          setActive("PARTICIPAR");
          setFidelidade("");
          return toast.warn(
            "Preencha o nome e o telefone para participar do programa de fidelidade!"
          );
        }
      }

      if (form.vei_nome.value) {
        if (!form.vei_placa.value || !form.vei_telefone.value) {
          setActive("PARTICIPAR");
          setFidelidade("");
          return toast.warn(
            "Preencha a placa e o telefone para participar do programa de fidelidade!"
          );
        }
      }

      if (form.vei_telefone.value) {
        if (!form.vei_placa.value || !form.vei_nome.value) {
          setActive("PARTICIPAR");
          setFidelidade("");
          return toast.warn(
            "Preencha o nome e a placa para participar do programa de fidelidade!"
          );
        }
      }

      if (yesNot.update && yesNot.veiculoId) {
        await axios
          .put(`http://localhost:8800/veiculo/${yesNot.veiculoId}`, {
            vei_placa: form.vei_placa.value.toUpperCase(),
            vei_nome_dono: form.vei_nome.value.toUpperCase(),
            vei_telefone_dono: form.vei_telefone.value.toUpperCase(),
          })
          .then(({ data }) => {
            setActive("PARTICIPANDO");
            setYesNot({
              show: false,
              update: yesNot.update,
              veiculoId: yesNot.veiculoId,
            });
            
            let qtdAgendamentos = 0;

            if (data[1] < 10) {
              qtdAgendamentos = 10 - data[1];
            }

            if (data[1] >= 10) {
              if (data[1] % 10 === 1) {
                toast.success(data[0]);
                return setFidelidade(
                  `🌟 Parabéns! Esse é seu agendamento de número ${data[1]}! Essa lavagem será 100% gratuita! 🌟`
                );
              }
              if (data[1] % 10 === 0) {
                toast.success(data[0]);
                return setFidelidade(
                  `Esse é seu agendamento de número ${data[1]}! Sua próxima lavagem será por nossa conta! 😎`
                );
              }
              qtdAgendamentos = 10 - (data[1] % 10);
            }
            setFidelidade(
              `Esse é seu agendamento de número ${data[1]}, contrate mais ${qtdAgendamentos} lavagens para obter o serviço gratuito!`
            );

            if (data[1] === 0) {
              setFidelidade(
                `Esse é seu primeiro agendamento com fidelidade, contrate mais 9 lavagens para obter o serviço gratuito!`
              );
            }

            return toast.success(data[0]);
          })
          .catch(({ response }) => toast.error(response.data));
      }

      if (
        form.vei_telefone.value &&
        form.vei_nome.value &&
        form.vei_placa.value
      ) {
        await axios
          .post("http://localhost:8800/veiculo", {
            vei_placa: form.vei_placa.value.toUpperCase(),
            vei_nome_dono: form.vei_nome.value.toUpperCase(),
            vei_telefone_dono: form.vei_telefone.value.toUpperCase(),
            atualizar: false,
          })
          .then(({ data }) => {
            console.log(data);
            if (data[1] === -1) {
              setFidelidade(
                `Já existe um veículo cadastrado com a placa ${form.vei_placa.value.toUpperCase()} porém com dados diferentes, deseja atualizar o nome e telefone?`
              );
              setYesNot({
                show: true,
                update: yesNot.update,
                veiculoId: data[2],
              });
              return toast.warning(data[0]);
            }
            setActive("PARTICIPANDO");
            let qtdAgendamentos = 0;

            if (data[1] < 10) {
              qtdAgendamentos = 10 - data[1];
            }

            if (data[1] >= 10) {
              if (data[1] % 10 === 1) {
                toast.success(data[0]);
                return setFidelidade(
                  `🌟 Parabéns! Esse é seu agendamento de número ${data[1]}! Essa lavagem será 100% gratuita! 🌟`
                );
              }
              if (data[1] % 10 === 0) {
                toast.success(data[0]);
                return setFidelidade(
                  `Esse é seu agendamento de número ${data[1]}! Sua próxima lavagem será por nossa conta! 😎`
                );
              }
              qtdAgendamentos = 10 - (data[1] % 10);
            }
            setFidelidade(
              `Esse é seu agendamento de número ${data[1]}, contrate mais ${qtdAgendamentos} lavagens para obter o serviço gratuito!`
            );

            if (data[1] === 0) {
              setFidelidade(
                `Esse é seu primeiro agendamento com fidelidade, contrate mais 9 lavagens para obter o serviço gratuito!`
              );
            }

            toast.success(data[0]);
          })
          .catch(({ response }) => toast.error(response.data));
      }
      return;
    }

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
      totalPrice: totalPrice,
      fidelidade: 70,
    };

    if (agendamento) {
      setIsModalOpen(true);
      setInfosForm(data);
    }
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
              Iremos buscar seu veículo, realizar o serviçoe levar novamente
              para você
            </CheckboxButton>
          </SelectionContainer>
        </div>

        <div className="section">
          <h3>Data</h3>
          <p>Para qual dia será o serviço?</p>
          <InputAreaDate>
            <Input name="age_data" type="date" onChange={handleDateChange} />
            {selectedDate && (
              <p dangerouslySetInnerHTML={{ __html: selectedDate }} />
            )}
          </InputAreaDate>
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
        <div className="section">
          <h3>Programa Fidelidade</h3>

          <p>
            Gostaria de ganhar uma <strong>lavagem totalmente gratuita?</strong>{" "}
            A cada 10 lavagens conosco a próxima é por nossa conta! 🤩
          </p>
          <p>Para participar basta preencher as 3 informações abaixo! ⬇️</p>
          <InputContainer>
            <InputAreaName>
              {/* <h5>Nome Completo</h5> */}
              <Input
                placeholder="Nome"
                name="vei_nome"
                type="text"
                onChange={() => {
                  setActive("PARTICIPAR");
                  setFidelidade("");
                }}
              />
            </InputAreaName>
            <InputArea>
              {/* <h5>Telefone</h5> */}
              <Input
                placeholder="Telefone"
                name="vei_telefone"
                type="text"
                onChange={() => {
                  setActive("PARTICIPAR");
                  setFidelidade("");
                }}
              />
            </InputArea>
            <InputArea>
              {/* <h5>Placa do veículo</h5> */}
              <Input
                placeholder="Placa do Veículo"
                name="vei_placa"
                type="text"
                onChange={() => {
                  setActive("PARTICIPAR");
                  setFidelidade("");
                }}
              />
            </InputArea>
            <InputArea className="wd">
              {/* <h5 className="transp">Placa do veículo</h5> */}
              <ButtonParticipar
                className={active}
                type="submit"
                disabled={weekDay === "DOMINGO"}
                onClick={() => {
                  setAgendamento(false);
                }}
              >
                {active} ✅
              </ButtonParticipar>
            </InputArea>
          </InputContainer>
          <p>{fidelidade}</p>
          {yesNot.show && (
            <InputAreaYesNot>
              <ButtonParticipar
                className={`yesNot`}
                type="submit"
                onClick={() => {
                  setYesNot({
                    show: true,
                    update: true,
                    veiculoId: yesNot.veiculoId,
                  });
                  setAgendamento(false);
                }}
              >
                SIM ✔️
              </ButtonParticipar>
              <ButtonParticipar
                className={`yesNot`}
                type="submit"
                onClick={() => {
                  setYesNot({
                    show: true,
                    update: false,
                    veiculoId: yesNot.veiculoId,
                  });
                  setAgendamento(false);
                }}
              >
                NÃO ❌
              </ButtonParticipar>
            </InputAreaYesNot>
          )}
        </div>
        <Button
          onClick={() => {
            setAgendamento(true);
          }}
          type="submit"
          disabled={weekDay === "DOMINGO"}
        >
          AGENDAR
        </Button>
      </FormContainer>
      <Modal
        style={{
          overlay: {
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          },
          content: {
            width: contentWidth,
            margin: "auto",
            background: "linear-gradient(to bottom right, #5c0a5c, #4b0082)",
            border: "none",
            borderRadius: "10px",
            padding: "40px",
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
