import { useState, useEffect } from "react";
import { Finish } from "./Styles";
import { Container } from "../../styles/global";
import { Link, useNavigate } from "react-router-dom";

function Finalizacao() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [title2, setTitle2] = useState("");
  const hash = localStorage.getItem("hash");
  const phrase = "AGENDAMENTO CONCLUÍDO COM SUCESSO! ✅";
  const phrase2 =
    "POR FAVOR CONTINUE O PROCESSO PELO CHAT DO WHATSAPP CLICANDO NO BOTÃO ABAIXO 😄";
  const delay = 40;

  useEffect(() => {
    let currentIndex = 0;

    if (hash.length < 50) {
      navigate("/");
    }

    const typingInterval = setInterval(() => {
      if (currentIndex <= phrase.length) {
        setTitle(phrase.slice(0, currentIndex));
        currentIndex += 1;
      } else {
        clearInterval(typingInterval);
      }
    }, delay);

    return () => clearInterval(typingInterval);
  }, [phrase, delay, navigate, hash]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000); // ajuste o tempo conforme necessário

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval2 = setInterval(() => {
      if (currentIndex <= phrase2.length) {
        setTitle2(phrase2.slice(0, currentIndex));
        currentIndex += 1;
      } else {
        clearInterval(typingInterval2);
      }
    }, delay);

    return () => clearInterval(typingInterval2);
  }, [phrase2, delay]);
  return (
    <>
      <Container>
        <Finish>
          <h2>
            {title}
            <br />
            <br />
            {title2}
          </h2>
          <Link
            to={`https://api.whatsapp.com/send?phone=554299858888&text=Olá!%20😃%0ARealizei%20um%20*agendamento*%20pelo%20site,%20segue%20os%20detalhes%20⤵️${hash}`}
            target="_blank"
            className="link"
          >
            <button>
              <div className="left"></div>
              IR PARA O WHATSAPP <i className="fab fa-whatsapp"></i>
              <div className="right"></div>
            </button>
          </Link>
          <Link
            to={`/feedback`}
            target="_blank"
            className="link cancel avaliar"
          >
            <button>
              <div className="left"></div>
              AVALIE NOSSO SERVIÇO 🌟
              <div className="right"></div>
            </button>
          </Link>
          <Link
            to={`https://api.whatsapp.com/send?phone=554299858888&text=Olá!%20🙂%0A*Gostaria%20de%20cancelar%20meu%20agendamento*%20❌%0AEstou%20ciente%20da%20taxa%20de%20*30%*%20*do*%20*valor*%20*total*%20caso%20o%20cancelamento%20esteja%20ocorrendo%20em%20menos%20de%2012%20horas%20da%20realização%20do%20serviço.`}
            target="_blank"
            className="link cancel"
          >
            <button>
              <div className="left"></div>
              CANCELAR AGENDAMENTO VIA WHATSAPP ❌<div className="right"></div>
            </button>
          </Link>
          <div className="videos">
            <div className="videos">
              <video muted autoPlay="autoplay" loop>
                <source
                  src="https://www.tratorcase.com.br/wp-content/uploads/2024/06/ferrari.mp4"
                  type="video/mp4"
                />
              </video>
              <video muted autoPlay="autoplay" loop>
                <source
                  src="https://www.tratorcase.com.br/wp-content/uploads/2024/06/proshe.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </Finish>
      </Container>
    </>
  );
}

export default Finalizacao;
