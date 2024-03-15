import { useState, useEffect } from "react";
import { Agendamento } from "./Styles";
import Form from "../../components/FormAgendamento/Form.js"

function Agendamentos() {
  const [title, setTitle] = useState("");
  const phrase = "PREENCHA O FORMULÁRIO E REALIZE SEU AGENDAMENTO DO NOSSOS SERVIÇOS =]";
  const delay = 100;
  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= phrase.length) {
        setTitle(phrase.slice(0, currentIndex));
        currentIndex += 1;
      } else {
        clearInterval(typingInterval);
      }
    }, delay);

    return () => clearInterval(typingInterval);
  }, [phrase, delay]);
  return (
    <>
      <Agendamento>
        <h2>{title}</h2>
        <Form />
      </Agendamento>
    </>
  );
}

export default Agendamentos;
