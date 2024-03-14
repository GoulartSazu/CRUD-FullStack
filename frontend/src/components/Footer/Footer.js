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
            </ul>
          </div>
          <div className="footer-col">
            <h4>Nosso instagram</h4>
            <div className="social-links">
              <a
                href="https://www.instagram.com/splash_pg/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-instagram"></i>
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
