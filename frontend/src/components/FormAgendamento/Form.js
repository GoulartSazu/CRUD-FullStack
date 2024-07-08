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
  TotalPrice,
  InputAreaDate,
  InputAreaYesNot,
} from "./Styles.js";
import { toast } from "react-toastify";
import { Container } from "../../styles/global";
import ConfirmationModal from "./ConfirmationModal.js";
import Modal from "react-modal";

const Form = ({ onEdit }) => {
  const ref = useRef();
  const [checkService, setCheckService] = useState("lavagemCompleta");
  const [checkCar, setCheckCar] = useState("medio");
  const [checkLocal, setCheckLocal] = useState(null);
  const [checkTime, setCheckTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [textHours, setTextHours] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [infosForm, setInfosForm] = useState({});
  const [contentWidth, setContentWidth] = useState("40%");
  const [active, setActive] = useState("SALVAR");
  const [fidelidade, setFidelidade] = useState("");
  const [agendamento, setAgendamento] = useState(false);
  const [qtdFidelidade, setQtdFidelidade] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
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

  function calcTotalPrice() {
    let totalPrice = 0;

    if (checkService === "lavagemCompleta") {
      totalPrice = 105;
      if (checkCar === "medio") {
        totalPrice = 85;
      }
    }

    if (checkService !== "lavagemCompleta") {
      totalPrice = 65;
      if (checkCar === "medio") {
        totalPrice = 55;
      }
    }

    if (checkLocal === "delivery") {
      totalPrice = totalPrice + 20;
    }
    return totalPrice;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = ref.current;
    let fidelidadeMsg = "";
    let quantidadeAtt = 0;

    if (checkLocal === "levaTras" || checkLocal === "delivery") {
      if (form.age_endereco?.value?.length < 10) {
        return toast.warn("Necessário informar mais detalhes do endereço.");
      }
      if (!form.age_endereco.value) {
        return toast.warn(
          "Para esse tipo de serviço é necessário informar o endereço."
        );
      }
    }

    if (agendamento) {
      if (form.vei_placa.value) {
        if (form.vei_placa.value.length !== 7) {
          return toast.warn("A Placa deve possuir 7 caracteres");
        }
        if (!form.vei_nome.value || !form.vei_telefone.value) {
          setActive("SALVAR");
          setFidelidade("");
          return toast.warn(
            "Preencha o nome e o telefone para participar do programa de fidelidade!"
          );
        }
      }

      if (form.vei_nome.value) {
        if (!form.vei_placa.value || !form.vei_telefone.value) {
          setActive("SALVAR");
          setFidelidade("");
          return toast.warn(
            "Preencha a placa e o telefone para participar do programa de fidelidade!"
          );
        }
      }

      if (form.vei_telefone.value) {
        if (form.vei_telefone.value.length !== 15) {
          return toast.warn("O Número de Telefone deve possuir 15 caracteres");
        }
        if (!form.vei_placa.value || !form.vei_nome.value) {
          setActive("SALVAR");
          setFidelidade("");
          return toast.warn(
            "Preencha o nome e a placa para participar do programa de fidelidade!"
          );
        }
      }

      if (
        form.vei_telefone.value &&
        form.vei_nome.value &&
        form.vei_placa.value
      ) {
        await axios
          .post(`${apiUrl}veiculo`, {
            vei_placa: form.vei_placa.value.toUpperCase(),
            vei_nome_dono: form.vei_nome.value.toUpperCase(),
            vei_telefone_dono: form.vei_telefone.value.toUpperCase(),
            atualizar: yesNot.update,
          })
          .then(async ({ data }) => {
            if (data[1] === -1) {
              if (data[2] > 0) {
                await axios
                  .put(`${apiUrl}veiculo/${data[2]}`, {
                    vei_id: data[2],
                  })
                  .then(({ data: response }) => {
                    setActive("PARTICIPANDO");
                    setYesNot({
                      show: false,
                      update: yesNot.update,
                      veiculoId: data[2],
                    });

                    let qtdAgendamentos = 0;

                    if (response[1] < 10) {
                      qtdAgendamentos = 10 - response[1];
                    }

                    if (response[1] >= 10) {
                      if (response[1] % 10 === 1) {
                        toast.success(response[0]);
                        setQtdFidelidade(response[1]);
                        fidelidadeMsg = `🌟 Parabéns! Esse é seu agendamento de número ${response[1]}! Essa lavagem será 100% gratuita! 🌟`;
                        return setFidelidade(
                          `🌟 Parabéns! Esse é seu agendamento de número ${response[1]}! Essa lavagem será 100% gratuita! 🌟`
                        );
                      }
                      if (response[1] % 10 === 0) {
                        toast.success(response[0]);
                        setQtdFidelidade(response[1]);
                        fidelidadeMsg = `Esse é seu agendamento de número ${response[1]}! Sua próxima lavagem será por nossa conta! 😎`;
                        return setFidelidade(
                          `Esse é seu agendamento de número ${response[1]}! Sua próxima lavagem será por nossa conta! 😎`
                        );
                      }
                      qtdAgendamentos = 10 - (response[1] % 10);

                      setQtdFidelidade(response[1]);
                    }
                    setQtdFidelidade(response[1]);
                    fidelidadeMsg = `Esse é seu agendamento de número ${response[1]}, contrate mais ${qtdAgendamentos} lavagens para obter o serviço gratuito!`;
                    setFidelidade(
                      `Esse é seu agendamento de número ${response[1]}, contrate mais ${qtdAgendamentos} lavagens para obter o serviço gratuito!`
                    );

                    if (response[1] === 0) {
                      setQtdFidelidade(1);
                      fidelidadeMsg = `Esse é seu primeiro agendamento com fidelidade, contrate mais 9 lavagens para obter o serviço gratuito!`;
                      setFidelidade(
                        `Esse é seu primeiro agendamento com fidelidade, contrate mais 9 lavagens para obter o serviço gratuito!`
                      );
                    }
                    fidelidadeMsg = response[0];
                    quantidadeAtt = response[1];
                    return toast.success(response[0]);
                  })
                  .catch(({ response }) => toast.error(response.data));
              }
            }
            setActive("PARTICIPANDO");
            let qtdAgendamentos = 0;
            if (quantidadeAtt === 0) {
              quantidadeAtt = data[1];
            }

            if (quantidadeAtt < 10) {
              qtdAgendamentos = 10 - quantidadeAtt;
            }

            if (quantidadeAtt >= 10) {
              if (quantidadeAtt % 10 === 1) {
                toast.success(data[0]);
                setQtdFidelidade(quantidadeAtt);
                fidelidadeMsg = `🌟 Parabéns! Esse é seu agendamento de número ${quantidadeAtt}! Essa lavagem será 100% gratuita! 🌟`;
                return setFidelidade(
                  `🌟 Parabéns! Esse é seu agendamento de número ${quantidadeAtt}! Essa lavagem será 100% gratuita! 🌟`
                );
              }
              if (quantidadeAtt % 10 === 0) {
                toast.success(data[0]);
                setQtdFidelidade(quantidadeAtt);
                fidelidadeMsg = `Esse é seu agendamento de número ${quantidadeAtt}! Sua próxima lavagem será por nossa conta! 😎`;
                return setFidelidade(
                  `Esse é seu agendamento de número ${quantidadeAtt}! Sua próxima lavagem será por nossa conta! 😎`
                );
              }
              qtdAgendamentos = 10 - (quantidadeAtt % 10);
              setQtdFidelidade(quantidadeAtt);
            }
            setQtdFidelidade(quantidadeAtt);
            if (
              !fidelidadeMsg.includes("conta!") &&
              !fidelidadeMsg.includes("100%")
            ) {
              fidelidadeMsg = `Esse é seu agendamento de número ${quantidadeAtt}, contrate mais ${qtdAgendamentos} lavagens para obter o serviço gratuito!`;
            }
            setFidelidade(
              `Esse é seu agendamento de número ${quantidadeAtt}, contrate mais ${qtdAgendamentos} lavagens para obter o serviço gratuito!`
            );

            if (quantidadeAtt === 0) {
              fidelidadeMsg = `Esse é seu primeiro agendamento com fidelidade, contrate mais 9 lavagens para obter o serviço gratuito!`;
              setFidelidade(
                `Esse é seu primeiro agendamento com fidelidade, contrate mais 9 lavagens para obter o serviço gratuito!`
              );
            }
            if (data[0]?.includes("Parabéns")) {
              toast.success(data[0]);
            }
          })
          .catch(({ response }) => toast.error(response));
      }
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

    if (!form.vei_placa.value) {
      return toast.warn("Por favor, informe a placa do veículo.");
    }

    if (!form.vei_nome.value) {
      return toast.warn("Por favor, informe o nome.");
    }

    if (!form.vei_telefone.value) {
      return toast.warn("Por favor, informe o telefone.");
    }

    if (selectedDate.includes("passado")) {
      return toast.warn("Data passada não permitida!");
    }

    const data = {
      service: checkService,
      car: checkCar,
      local: checkLocal,
      time: checkTime,
      endereco: form.age_endereco?.value
        ? form.age_endereco.value.toUpperCase()
        : null,
      agendamentoDate: selectedDate,
      agendamentoDateValue: form.age_data.value,
      totalPrice: calcTotalPrice(),
      fidelidade: fidelidadeMsg,
      placa: form.vei_placa.value ? form.vei_placa.value.toUpperCase() : null,
      telefone: form.vei_telefone.value
        ? form.vei_telefone.value.toUpperCase()
        : null,
      nome: form.vei_nome.value ? form.vei_nome.value.toUpperCase() : null,
      qtdFidelidade: qtdFidelidade,
    };

    if (agendamento) {
      setIsModalOpen(true);
      setInfosForm(data);
    }
  };

  return (
    <Container>
      <TotalPrice>VALOR TOTAL: R$ {calcTotalPrice()},00</TotalPrice>
      <FormContainer ref={ref} onSubmit={handleSubmit}>
        <div className="section">
          <h3>Veículo</h3>
          <p>Qual o tamanho do seu veículo?</p>
          <SelectionContainer>
            <div className="car">
              <CheckboxButton
                checked={checkCar === "medio"}
                onClick={(e) => {
                  e.preventDefault();
                  handleCheckCar("medio");
                }}
              >
                <span>Médio</span> <i className="fas fa-angle-right"></i> Nivus,
                Compass, Polo, Saveiro. Em geral veículos de 5 lugares.
              </CheckboxButton>
              {/* <span
                className={`price ${checkCar === "medio" ? "checked" : ""}`}
              >
                + R$ 00,00
              </span> */}
            </div>
            <div className="car">
              <CheckboxButton
                checked={checkCar === "grande"}
                onClick={(e) => {
                  e.preventDefault();
                  handleCheckCar("grande");
                }}
              >
                <span>Grande</span> <i className="fas fa-angle-right"></i>{" "}
                Ranger, Sw4, Commander, Pajero. Em geral caminhonetes e 7
                lugares.
              </CheckboxButton>
              {/* <span className={`price ${checkCar === "medio" ? "grande" : ""}`}>
                + R$ 20,00
              </span> */}
            </div>
          </SelectionContainer>
        </div>

        <div className="section">
          <h3>Serviço</h3>
          <p>Qual serviço deseja contratar?</p>
          <SelectionContainer>
            <div>
              <CheckboxButton
                checked={checkService === "lavagemCompleta"}
                onClick={(e) => {
                  e.preventDefault();
                  handleCheckService("lavagemCompleta");
                }}
              >
                <span>Lavagem Completa</span>{" "}
                <i className="fas fa-angle-right"></i> Interna e externa.
              </CheckboxButton>
              <span
                className={`price ${
                  checkService === "lavagemCompleta" ? "checked" : ""
                }`}
              >
                {checkCar === "grande" ? "R$ 105,00" : "R$ 85,00"}
              </span>
            </div>
            <div>
              <CheckboxButton
                checked={checkService === "aparencia"}
                onClick={(e) => {
                  e.preventDefault();
                  handleCheckService("aparencia");
                }}
              >
                <span>Aparência</span> <i className="fas fa-angle-right"></i>{" "}
                Lavagem externa.
              </CheckboxButton>
              <span
                className={`price ${
                  checkService === "aparencia" ? "checked" : ""
                }`}
              >
                {checkCar === "grande" ? "R$ 65,00" : "R$ 55,00"}
              </span>
            </div>
            <div>
              <CheckboxButton
                checked={checkService === "interna"}
                onClick={(e) => {
                  e.preventDefault();
                  handleCheckService("interna");
                }}
              >
                <span>Interna</span> <i className="fas fa-angle-right"></i>{" "}
                Limpeza interna.
              </CheckboxButton>
              <span
                className={`price ${
                  checkService === "interna" ? "checked" : ""
                }`}
              >
                {checkCar === "grande" ? "R$ 65,00" : "R$ 55,00"}
              </span>
            </div>
          </SelectionContainer>
        </div>

        <div className="section">
          <h3>Local</h3>
          <p>Qual local seria o serviço?</p>
          <SelectionContainer>
            <div>
              <CheckboxButton
                checked={checkLocal === "delivery"}
                onClick={(e) => {
                  e.preventDefault();
                  handleCheckLocal("delivery");
                }}
              >
                <span>Delivery</span> <i className="fas fa-angle-right"></i>{" "}
                Vamos até sua residência e levamos todo o equipamento necessário
                pra realizar o serviço no local.
              </CheckboxButton>
              <span
                className={`price ${
                  checkService === "lavagemCompleta" ? "checked" : ""
                }`}
              >
                + R$ 20,00
              </span>
            </div>
            <div>
              <CheckboxButton
                checked={checkLocal === "espacoSplash"}
                onClick={(e) => {
                  e.preventDefault();
                  handleCheckLocal("espacoSplash");
                }}
              >
                <span>Espaco Splash</span>{" "}
                <i className="fas fa-angle-right"></i> Você irá trazer seu
                veículo em nosso endereço: Rua Quinze de Novembro, 773 - Centro.
              </CheckboxButton>
              <span
                className={`price ${
                  checkService === "lavagemCompleta" ? "checked" : ""
                }`}
              >
                + R$ 00,00
              </span>
            </div>
            {/* <div>
              <CheckboxButton
                checked={checkLocal === "levaTras"}
                onClick={(e) => {
                  e.preventDefault();
                  handleCheckLocal("levaTras");
                }}
              >
                <span>Leva e Traz</span> <i className="fas fa-angle-right"></i>{" "}
                Buscamos seu veículo, realizamos o serviço escolhido e levamos
                novamente para o local de onde foi pego.
              </CheckboxButton>
              <span
                className={`price ${
                  checkService === "lavagemCompleta" ? "checked" : ""
                }`}
              >
                + R$ 00,00
              </span>
            </div> */}
          </SelectionContainer>
          {(checkLocal === "levaTras" || checkLocal === "delivery") && (
            <InputAreaName className="loc">
              <p className="endereco">Por favor, informe seu endereço ⬇️</p>
              <Input
                placeholder="Endereço"
                name="age_endereco"
                className="end"
                type="text"
              />
            </InputAreaName>
          )}
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
            A cada 10 lavagens conosco a próxima é por{" "}
            <strong>nossa conta!</strong> 🤩
          </p>
          <p>Por favor preencha as as 3 informações abaixo! ⬇️</p>
          <InputContainer>
            <InputAreaName>
              {/* <h5>Nome Completo</h5> */}
              <Input
                placeholder="Nome"
                name="vei_nome"
                type="text"
                onChange={() => {
                  setActive("SALVAR");
                  setFidelidade("");
                }}
              />
            </InputAreaName>
            <InputArea>
              {/* <h5>Telefone</h5> */}
              <Input
                placeholder="Telefone com DDD"
                name="vei_telefone"
                type="text"
                maxLength={14}
                onChange={(e) => {
                  let phoneNumber = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
                  if (phoneNumber.length <= 2) {
                    e.target.value = phoneNumber; // Mantém apenas os dígitos se o tamanho for menor ou igual a 2
                  } else if (phoneNumber.length <= 10) {
                    e.target.value = `(${phoneNumber.slice(
                      0,
                      2
                    )}) ${phoneNumber.slice(2)}`; // Adiciona o formato (99) nos primeiros 2 dígitos
                  } else {
                    e.target.value = `(${phoneNumber.slice(
                      0,
                      2
                    )}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7)}`; // Adiciona o formato (99) 99999-9999
                  }
                  setActive("SALVAR");
                  setFidelidade("");
                }}
              />
            </InputArea>
            <InputArea>
              <Input
                placeholder="Placa do Veículo"
                name="vei_placa"
                maxLength={7}
                type="text"
                onChange={() => {
                  setActive("SALVAR");
                  setFidelidade("");
                }}
              />
            </InputArea>
            {/* <InputArea className="wd">
              <h5 className="transp">Placa do veículo</h5>
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
            </InputArea> */}
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
            setYesNot({
              show: false,
              update: false,
              veiculoId: yesNot.veiculoId,
            });
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
