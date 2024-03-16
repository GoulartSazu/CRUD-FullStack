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

const { format } = require("date-fns");
const getCurrentDateTime = () => format(new Date(), "yyyy-MM-dd HH:mm:ss");

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();
  const [checkService, setCheckService] = useState("lavagemCompleta");
  const [checkCar, setCheckCar] = useState("medio");
  const [checkLocal, setCheckLocal] = useState("delivery");
  const [checkTime, setCheckTime] = useState("8h");

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

  console.log(checkService);

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.usr_nome.value = onEdit.usr_nome;
      user.usr_email.value = onEdit.usr_email;
      user.usr_fone.value = onEdit.usr_fone;
      user.usr_data_nascimento.value = onEdit.usr_data_nascimento;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    return;

    const user = ref.current;

    if (
      !user.usr_nome.value ||
      !user.usr_email.value ||
      !user.usr_fone.value ||
      !user.usr_data_nascimento.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          usr_nome: user.usr_nome.value,
          usr_email: user.usr_email.value,
          usr_fone: user.usr_fone.value,
          usr_cidade: "Ponta Grossa",
          usr_bairro: "Uvaranas",
          usr_rua: "Jaguapitã",
          usr_numero: 545,
          usr_data_nascimento: user.usr_data_nascimento.value,
          date_insert: getCurrentDateTime(),
          date_update: getCurrentDateTime(),
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          usr_nome: user.usr_nome.value,
          usr_email: user.usr_email.value,
          usr_fone: user.usr_fone.value,
          usr_cidade: "Ponta Grossa",
          usr_bairro: "Uvaranas",
          usr_rua: "Jaguapitã",
          usr_numero: 545,
          usr_data_nascimento: user.usr_data_nascimento.value,
          date_insert: getCurrentDateTime(),
          date_update: getCurrentDateTime(),
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.usr_nome.value = "";
    user.usr_email.value = "";
    user.usr_fone.value = "";
    user.usr_data_nascimento.value = "";

    setOnEdit(null);
    getUsers();
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
              onClick={() => handleCheckService("lavagemCompleta")}
            >
              <span>Lavagem Completa</span>{" "}
              <i className="fas fa-angle-right"></i> Interna e externa
            </CheckboxButton>
            <CheckboxButton
              checked={checkService === "aparencia"}
              onClick={() => handleCheckService("aparencia")}
            >
              <span>Aparência</span> <i className="fas fa-angle-right"></i>{" "}
              Lavagem externa
            </CheckboxButton>
            <CheckboxButton
              checked={checkService === "interna"}
              onClick={() => handleCheckService("interna")}
            >
              <span>Interna</span> <i className="fas fa-angle-right"></i>{" "}
              Limpeza interna
            </CheckboxButton>
          </SelectionContainer>
          {/* <InputArea>
          <Label>Nome</Label>
          <Input name="usr_nome" />
        </InputArea> */}
        </div>

        <div className="section">
          <h3>Veículo</h3>
          <p>Qual o tamanho do seu veículo?</p>
          <SelectionContainer>
            <CheckboxButton
              checked={checkCar === "medio"}
              className="car"
              onClick={() => handleCheckCar("medio")}
            >
              <span>Médio</span> <i className="fas fa-angle-right"></i> HB20,
              Celta, Onix, Kwid, Sandero, Corsa
            </CheckboxButton>
            <CheckboxButton
              checked={checkCar === "grande"}
              className="car"
              onClick={() => handleCheckCar("grande")}
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
              onClick={() => handleCheckLocal("delivery")}
            >
              <span>Delivery</span> <i className="fas fa-angle-right"></i>{" "}
              Iremos até o local do seu veículo para realizar o serviço
            </CheckboxButton>
            <CheckboxButton
              checked={checkLocal === "espacoSplash"}
              onClick={() => handleCheckLocal("espacoSplash")}
            >
              <span>Espaco Splash</span> <i className="fas fa-angle-right"></i>{" "}
              Você irá trazer seu veículo em nosso endereço
            </CheckboxButton>
            <CheckboxButton
              checked={checkLocal === "levaTras"}
              onClick={() => handleCheckLocal("levaTras")}
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
            <Input name="usr_data_nascimento" type="date" />
          </InputArea>
          {/* "aqui colocar qual dia da semana foi selcionado" */}
        </div>

        <div className="section">
          <h3>Horário</h3>
          <p>Qual horário do dia X deseja?</p>
          <SelectionContainer>
            <CheckboxButton
              className="h"
              checked={checkTime === "8h"}
              onClick={() => handleCheckTime("8h")}
            >
              <span>8h</span>
            </CheckboxButton>
            <CheckboxButton
              className="h"
              checked={checkTime === "10h"}
              onClick={() => handleCheckTime("10h")}
            >
              <span>10h</span>
            </CheckboxButton>
            <CheckboxButton
              className="h"
              checked={checkTime === "13h"}
              onClick={() => handleCheckTime("13h")}
            >
              <span>13h</span>
            </CheckboxButton>
            <CheckboxButton
              className="h"
              checked={checkTime === "15h"}
              onClick={() => handleCheckTime("15h")}
            >
              <span>15h</span>
            </CheckboxButton>
          </SelectionContainer>
        </div>

        {/* <InputArea>
        <Label>E-mail</Label>
        <Input name="usr_email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="usr_fone" />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="usr_data_nascimento" type="date" />
      </InputArea> */}

        <Button type="submit">SALVAR</Button>
      </FormContainer>
    </Container>
  );
};

export default Form;
