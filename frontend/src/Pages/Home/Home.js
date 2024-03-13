import { useState, useEffect } from "react";
import { HomePage } from "./Styles";
import { Container } from "../../styles/global";
import { Link } from 'react-router-dom';

function Home() {
  const [title, setTitle] = useState("");
  const phrase = "BEM VINDO AO PRIMEIRO E ÚNICO LAVACAR DELIVERY DE PONTA GROSSA";
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
      <Container>
        <HomePage>
          <h1>SPLASH</h1>
          <h2>{title}</h2>
					<Link to="/agendamento" className="link">
						<button href="https://twitter.com/kamildyrek">
							<div className="left"></div>
							AGENDAR UM HORÁRIO!
							<div className="right"></div>
						</button>
					</Link>
        </HomePage>
      </Container>
    </>
  );
}

export default Home;
