import React from "react";
import { Foot } from "./Styles";
import { Container } from "../../styles/global";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Foot>
      <Container>
        <div className="row">
          <div className="footer-col">
            <h4>Agende seu horário</h4>
            <ul>
              <li>
              <Link to="/agendamento" className="link">
                Agendar</Link>
              </li>
              <li>
              <Link to="/feedback" className="link">
                Avaliar</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Entre em contato</h4>
            <div className="social-links">
              <a
                href="https://www.instagram.com/splash_pg/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=554299858888&text=Olá.%20Gostaria%20de%20contratar%20um%20serviço!"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>
              Desenvolvido por <span>X</span>{' '}{' '}{' '}{' '}
              <a
                href="https://www.instagram.com/_goulartmatheus/"
                target="_blank"
                rel="noreferrer"
                className="insta-sazu"
              >
                {' '} @_goulartMatheus
              </a>
            </h4>
            <div className="social-links">
              <a
                href="https://www.instagram.com/_goulartmatheus/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/matheus-goulart-de-freitas-08404219a/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Foot>
  );
};

export default Footer;
