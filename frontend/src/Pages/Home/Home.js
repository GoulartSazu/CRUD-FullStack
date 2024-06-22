import { useState, useEffect } from "react";
import { HomePage } from "./Styles";
import { Container } from "../../styles/global";
import { Link } from "react-router-dom";
import video from "../../images/video1.mp4";

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
            <video muted autoPlay="autoplay" loop>
              <source
                src={video}
                type="video/mp4"
              />
            </video>
            <video muted autoPlay="autoplay" loop>
              <source
                src={video}
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
