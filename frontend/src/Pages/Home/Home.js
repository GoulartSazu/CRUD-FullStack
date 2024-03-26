import { useState, useEffect } from "react";
import { HomePage } from "./Styles";
import { Container } from "../../styles/global";
import { Link } from "react-router-dom";

function Home() {
  const [title, setTitle] = useState("");
  const phrase =
    "BEM - VINDO AO PRIMEIRO E ÚNICO LAVACAR DELIVERY DE PONTA GROSSA";
  const delay = 70;
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
      <Container>
        <HomePage>
          <h1>SPLASH</h1>
          <h2>{title}</h2>
          <Link to="/agendamento" className="link">
            <button>
              <div className="left"></div>
              AGENDAR UM HORÁRIO!
              <div className="right"></div>
            </button>
          </Link>
          <div className="videos">
            <video muted autoplay="autoplay" loop>
              <source
                src="http://fleming.mapa360.com.br/wp-content/uploads/2024/03/copy_BFC2B67E-ABF3-48B8-B80E-1CEC3E91E9C3.mp4"
                type="video/mp4"
              />
            </video>
            <video muted autoplay="autoplay" loop>
              <source
                src="http://fleming.mapa360.com.br/wp-content/uploads/2024/03/copy_4E66255D-E4E9-4C68-B5D4-9518B4C3A12D.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </HomePage>
      </Container>
    </>
  );
}

export default Home;
