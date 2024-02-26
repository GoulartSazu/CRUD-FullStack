import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const { format } = require('date-fns');

const getCurrentDateTime = () => format(new Date(), 'yyyy-MM-dd HH:mm:ss');

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
          usr_cidade: 'Ponta Grossa',
          usr_bairro: 'Uvaranas',
          usr_rua: 'Jaguapitã',
          usr_numero: 545,
          usr_data_nascimento: user.usr_data_nascimento.value,
          date_insert: getCurrentDateTime(),
          date_update: getCurrentDateTime()
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          usr_nome: user.usr_nome.value,
          usr_email: user.usr_email.value,
          usr_fone: user.usr_fone.value,
          usr_cidade: 'Ponta Grossa',
          usr_bairro: 'Uvaranas',
          usr_rua: 'Jaguapitã',
          usr_numero: 545,
          usr_data_nascimento: user.usr_data_nascimento.value,
          date_insert: getCurrentDateTime(),
          date_update: getCurrentDateTime()
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
      <InputArea>
        <Label>Nome</Label>
        <Input name="usr_nome" />
      </InputArea>
      <InputArea>
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
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
