import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Container } from "../../styles/global";
import Modal from 'react-modal';
const { format } = require("date-fns");
const getCurrentDateTime = () => format(new Date(), "yyyy-MM-dd HH:mm:ss");

const ConfirmationModal = ({data}) => {
  const ref = useRef();
  const [checkService, setCheckService] = useState("lavagemCompleta");
  const [checkCar, setCheckCar] = useState(null);
  const [checkLocal, setCheckLocal] = useState(null);
  const [checkTime, setCheckTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = ref.current;

    console.log(
      form.age_data.value,
      checkCar,
      checkLocal,
      checkTime,
      checkService
    );

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

    setIsModalOpen(true);


      await axios
        .post("http://localhost:8800", {
          usr_nome: form.usr_nome.value,
          usr_email: form.usr_email.value,
          usr_fone: form.usr_fone.value,
          usr_cidade: "Ponta Grossa",
          usr_bairro: "Uvaranas",
          usr_rua: "Jaguapitã",
          usr_numero: 545,
          usr_data_nascimento: form.usr_data_nascimento.value,
          date_insert: getCurrentDateTime(),
          date_update: getCurrentDateTime(),
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));


    form.usr_nome.value = "";
    form.usr_email.value = "";
    form.usr_fone.value = "";
    form.usr_data_nascimento.value = "";

  };

  return (
    <Container>
      <h1>{data.car}</h1>
      <h1>{data.local}</h1>
      <h1>{data.time}</h1>
      <h1>{data.service}</h1>
      <h1>{data.agendamentoDate}</h1>
    </Container>
  );
};

export default ConfirmationModal;
