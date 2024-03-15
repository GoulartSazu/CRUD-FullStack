import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const { format } = require("date-fns");

const getCurrentDateTime = () => format(new Date(), "yyyy-MM-dd HH:mm:ss");

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  width: 100%;
  justify-content: space-between;
`;

const CheckboxButton = styled.button`
  padding: 10px;
  margin: 5px;
  border: 1px solid #bbb;
  border-radius: 5px;
  background-color: ${({ checked }) => (checked ? "#ccc" : "transparent")};
  color: ${({ checked }) => (checked ? "#000" : "#333")};
  cursor: pointer;
`;

const SelectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

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

  console.log(checkService)

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

    return

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
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <div>
        <h3>Serviço</h3>
        <p>Qual serviço deseja contratar?</p>
        <SelectionContainer>
          <CheckboxButton
            checked={checkService === "lavagemCompleta"}
            onClick={() => handleCheckService("lavagemCompleta")}
          >
            Lavagem Completa - Limpeza interna e externa
          </CheckboxButton>
          <CheckboxButton
            checked={checkService === "aparencia"}
            onClick={() => handleCheckService("aparencia")}
          >
            Aparência - Lavagem externa
          </CheckboxButton>
          <CheckboxButton
            checked={checkService === "interna"}
            onClick={() => handleCheckService("interna")}
          >
            Interna - Limpeza interna
          </CheckboxButton>
          {/* Adicione quantos botões de seleção desejar */}
        </SelectionContainer>
        {/* <InputArea>
          <Label>Nome</Label>
          <Input name="usr_nome" />
        </InputArea> */}
      </div>
      
      <div>
        <h3>Veículo</h3>
        <p>Qual o tamanho do seu veículo?</p>
        <SelectionContainer>
          <CheckboxButton
            checked={checkCar === "medio"}
            onClick={() => handleCheckCar("medio")}
          >
            Médio - HB20, Celta, Onix, Kwid, Sandero, Corsa etc...
          </CheckboxButton>
          <CheckboxButton
            checked={checkCar === "grande"}
            onClick={() => handleCheckCar("grande")}
          >
            Grande - S10, Montana, Amarok, Ranger, Hilux, Strada etc...
          </CheckboxButton>
        </SelectionContainer>
      </div>

      <div>
        <h3>Local</h3>
        <p>Qual local seria o serviço?</p>
        <SelectionContainer>
          <CheckboxButton
            checked={checkLocal === "delivery"}
            onClick={() => handleCheckLocal("delivery")}
          >
            Delivery - Iremos até o local do seu veículo
          </CheckboxButton>
          <CheckboxButton
            checked={checkLocal === "espacoSplash"}
            onClick={() => handleCheckLocal("espacoSplash")}
          >
            Espaco Splash - Você irá trazer seu veículo em nosso endereço
          </CheckboxButton>
          <CheckboxButton
            checked={checkLocal === "levaTras"}
            onClick={() => handleCheckLocal("levaTras")}
          >
            Leva e Trás - Iremos buscar seu veículo, realizar a limpeza no espaço Splash e levar novamente para você.
          </CheckboxButton>
        </SelectionContainer>
      </div>

      <div>
        <h3>Data</h3>
        <p>Para qual dia será o serviço?</p>
        <InputArea>
        <Input name="usr_data_nascimento" type="date" />
      </InputArea>
      {/* "aqui colocar qual dia da semana foi selcionado" */}
      </div>

      <div>
        <h3>Horário</h3>
        <p>Qual horário do dia X deseja?</p>
        <SelectionContainer>
          <CheckboxButton
            checked={checkTime === "8h"}
            onClick={() => handleCheckTime("8h")}
          >
            8h
          </CheckboxButton>
          <CheckboxButton
            checked={checkTime === "10h"}
            onClick={() => handleCheckTime("10h")}
          >
            10h
          </CheckboxButton>
          <CheckboxButton
            checked={checkTime === "13h"}
            onClick={() => handleCheckTime("13h")}
          >
            13h
          </CheckboxButton>
          <CheckboxButton
            checked={checkTime === "15h"}
            onClick={() => handleCheckTime("15h")}
          >
            15h
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
  );
};

export default Form;
