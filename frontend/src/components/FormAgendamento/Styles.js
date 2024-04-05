import styled from "styled-components";

export const Confirmation = styled.div`
  color: white;
  letter-spacing: 1px;

  h2 {
    text-align: center;
    font-size: 32px;
    font-weight: 400;
  }

  span {
    background-color: white;
    padding: 5px 10px 5px;
    color: #4b0082;
    border-radius: 2px;
  }

  h3 {
    display: flex;
    align-items: center;
    margin: 50px 0;
    font-size: 18px;
    font-weight: 400;

    i {
      margin-left: 10px;
      margin-right: 10px;
    }
  }

  h4 {
    background-color: white;
    color: #32cd32;
    padding: 10px;
    border-radius: 2px;
    font-weight: 600;
    text-align: center;
    margin: 0px auto 20px;
    width: 300px;
    font-size: 22px;
    letter-spacing: 2px;
  }
  p {
    font-size: 12px;
    text-align: center;
    margin-bottom: 50px;
  }
  @media only screen and (max-width: 950px) {
    h2 {
      font-size: 20px;
    }
    h3 {
      font-size: 14px;
      flex-direction: column;
      margin: 25px auto;
      i {
        rotate: 90deg;
        margin: 2px 0;
      }
    }
    h4 {
      width: inherit;
      font-size: 14px;
      padding: 5px;
    }
    p {
      font-size: 10px;
      margin-bottom: 25px;
    }
    span {
      text-align: center;
    }
  }
`;

export const CheckboxButton = styled.button`
  padding: 20px;
  margin: 5px;
  border-radius: 5px;
  background: ${({ checked }) =>
    checked
      ? "linear-gradient(to bottom right, #800080, #4b0082)"
      : "transparent"};
  color: white;
  letter-spacing: 1px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.9);
  font-weight: 300;
  transition: all 0.3s;
  transform: ${({ checked }) => (checked ? "scale(1.05)" : "scale(1)")};
  width: 30%;
  line-height: 24px;
  :hover {
    box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.9);
    transform: scale(1.05);
  }
  @media only screen and (max-width: 950px) {
    width: 100%;
    font-size: 12px;
    padding: 10px;
    transform: ${({ checked }) => (checked ? "scale(1)" : "scale(1)")};
    :hover {
      box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.9);
      transform: scale(1);
    }
  }
`;

export const FormContainer = styled.form`
  align-items: center;
  background-color: #fff;
  padding: 50px;
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  width: 80%;
  margin: 100px auto 200px;

  h3,
  p {
    background-clip: text;
    -webkit-background-clip: text; /* Para navegadores baseados no WebKit */
    color: transparent; /* Torna o texto transparente */
    background-image: linear-gradient(to bottom right, #e2adff, #4b0082);
    font-size: 28px;
    letter-spacing: 2px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  p {
    font-size: 20px;
    text-transform: inherit;
    font-weight: 300;
    color: white;
  }
  .section {
    margin-bottom: 100px;
    .car {
      width: 45%;
    }
    .h {
      width: 20%;
    }
    span {
      background-color: white;
      padding: 1px 5px 2px;
      color: #4b0082;
      border-radius: 2px;
      font-weight: 400;
    }
    @media only screen and (max-width: 950px) {
      margin-bottom: 20px;
      .car {
        width: 100%;
      }
      .h {
        width: 100%;
      }
    }
  }
  @media only screen and (max-width: 950px) {
    margin: 0px auto 50px;
    width: 80%;
    padding: 20px;
    h3 {
      font-size: 20px;
    }
    p {
      font-size: 14px;
    }
    h3,
    p {
      margin-bottom: 10px;
    }
  }
`;

export const SelectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media only screen and (max-width: 950px) {
    flex-direction: column;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .wd {
    width: 30%;
  }

  @media only screen and (max-width: 950px) {
    flex-direction: column;
  }
`;

export const InputArea = styled.div`
  width: 20%;
  .transp {
    color: transparent;
  }
  .simNao {
    display: flex;
  }

  .PARTICIPANDO {
    box-shadow: rgb(255, 255, 255, 0.62) 2px 2px 20px;
    background: linear-gradient(to bottom right, green, #723172);
    opacity: 1;
  }

  p {
    margin-bottom: 0;
    margin-left: 20px;
    text-transform: uppercase;
    font-size: 16px;

    strong {
      font-weight: 800;
    }
  }

  h5 {
    font-size: 16px;
    color: white;
    margin-bottom: 20px;
    font-weight: 400;
    letter-spacing: 2px;
  }
  input {
    padding: 20px;
    border-radius: 5px;
    background: linear-gradient(to bottom right, #800080, #4b0082);
    color: white;
    letter-spacing: 1px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.9);
    font-weight: 300;
    transition: all 0.3s;
    transform: ${({ checked }) => (checked ? "scale(1.05)" : "scale(1)")};
    width: 90%;
    line-height: 24px;
    :hover {
      box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.9);
      transform: scale(1);
    }
    :focus-visible {
      border: none;
      outline: none;
    }
    ::placeholder {
      color: white;
      opacity: 0.5;
    }
    ::-webkit-calendar-picker-indicator {
      /* Filter para ajustar a cor do ícone para branco */
      filter: brightness(0) invert(1);
      font-size: 30px;
      cursor: pointer;
    }
  }
  .yesNot{
    box-shadow: rgb(255, 255, 255, 1) 2px 2px 20px;
    background: linear-gradient(to bottom right, green, #723172);
    opacity: 1;
  }
  @media only screen and (max-width: 950px) {
    flex-direction: column;
    input {
      width: 80%;
      padding: 10px;
      margin-bottom: 20px;
    }
    p {
      font-size: 12px;
      text-align: center;
      margin: 0;
    }
  }
`;

export const InputAreaYesNot = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin: auto;

  .yesNot{
    box-shadow: rgb(255, 255, 255, 0.5) 2px 2px 20px;
    background: linear-gradient(to bottom right, green, #723172);
    opacity: 1;
    width: 40% !important;
  }

  @media only screen and (max-width: 950px) {
    flex-direction: column;
    input {
      width: 80%;
      padding: 10px;
      margin-bottom: 20px;
    }
    p {
      font-size: 12px;
      text-align: center;
      margin: 0;
    }
  }
`;

export const InputAreaDate = styled.div`
  width: 100%;
  display: flex;
  align-items: center;


  p {
    margin-bottom: 0;
    margin-left: 20px;
    text-transform: uppercase;
    font-size: 16px;

    strong {
      font-weight: 800;
    }
  }
  input {
    padding: 20px;
    border-radius: 5px;
    background: linear-gradient(to bottom right, #800080, #4b0082);
    color: white;
    letter-spacing: 1px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.9);
    font-weight: 300;
    transition: all 0.3s;
    transform: ${({ checked }) => (checked ? "scale(1.05)" : "scale(1)")};
    width: 15%;
    line-height: 24px;
    :hover {
      box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.9);
      transform: scale(1);
    }
    :focus-visible {
      border: none;
      outline: none;
    }
    ::placeholder {
      color: white;
      opacity: 0.5;
    }
    ::-webkit-calendar-picker-indicator {
      /* Filter para ajustar a cor do ícone para branco */
      filter: brightness(0) invert(1);
      font-size: 30px;
      cursor: pointer;
    }
  }
  @media only screen and (max-width: 950px) {
    flex-direction: column;
    input {
      width: 80%;
      padding: 10px;
      margin-bottom: 20px;
    }
    p {
      font-size: 12px;
      text-align: center;
      margin: 0;
    }
  }
`;

export const InputAreaName = styled.div`

  width: 20%;
  p {
    margin-bottom: 0;
    margin-left: 20px;
    text-transform: uppercase;
    font-size: 16px;

    strong {
      font-weight: 800;
    }
  }
  h5 {
    font-size: 16px;
    color: white;
    margin-bottom: 20px;
    font-weight: 400;
    letter-spacing: 2px;
  }
  input {
    padding: 20px;
    border-radius: 5px;
    background: linear-gradient(to bottom right, #800080, #4b0082);
    color: white;
    letter-spacing: 1px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.9);
    font-weight: 300;
    transition: all 0.3s;
    transform: ${({ checked }) => (checked ? "scale(1.05)" : "scale(1)")};
    width: 90%;
    line-height: 24px;
    :hover {
      box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.9);
      transform: scale(1);
    }
    :focus-visible {
      border: none;
      outline: none;
    }
    ::placeholder {
      color: white;
      opacity: 0.5;
    }
    ::-webkit-calendar-picker-indicator {
      /* Filter para ajustar a cor do ícone para branco */
      filter: brightness(0) invert(1);
      font-size: 30px;
      cursor: pointer;
    }
  }
  @media only screen and (max-width: 950px) {
    flex-direction: column;
    input {
      width: 80%;
      padding: 10px;
      margin-bottom: 20px;
    }
    p {
      font-size: 12px;
      text-align: center;
      margin: 0;
    }
  }
`;

export const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
`;

export const Button = styled.button`
  position: relative;
  padding: 20px 80px;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-size: 28px;
  margin: auto;
  background: linear-gradient(to bottom right, #800080, #4b0082);
  box-shadow: rgb(255, 255, 255, 0.5) 0px 0px 55px;
  border-radius: 10px;
  z-index: 0;
  overflow: hidden;
  display: flex;
  color: white;
  transition: all 0.9s;

  :hover {
    box-shadow: rgb(255, 255, 255, 1) 2px 2px 99px;
    border-radius: 1005px;
  }
  :disabled {
    opacity: 0.6; /* Reduz a opacidade quando o botão está desativado */
    cursor: not-allowed; /* Muda o cursor para 'not-allowed' quando o botão está desativado */
    background: linear-gradient(to bottom right, black, #4b0082);
  }

  ::before {
    content: "";
    pointer-events: none;
    opacity: 0.6;
    background: radial-gradient(
        circle at 20% 35%,
        transparent 0,
        transparent 2px,
        hsla(210, 50%, 85%, 1) 3px,
        hsla(210, 50%, 85%, 1) 4px,
        transparent 4px
      ),
      radial-gradient(
        circle at 5% 50%,
        transparent 0,
        transparent 2px,
        hsla(210, 50%, 85%, 1) 3px,
        hsla(210, 50%, 85%, 1) 4px,
        transparent 4px
      ),
      radial-gradient(
        circle at 25% 45%,
        transparent 0,
        transparent 2px,
        hsla(210, 50%, 85%, 1) 3px,
        hsla(210, 50%, 85%, 1) 4px,
        transparent 4px
      ),
      radial-gradient(
        circle at 75% 44%,
        transparent 0,
        transparent 2px,
        hsla(210, 50%, 85%, 1) 3px,
        hsla(210, 50%, 85%, 1) 4px,
        transparent 4px
      ),
      radial-gradient(
        circle at 70% 40%,
        transparent 0,
        transparent 2px,
        hsla(210, 50%, 85%, 1) 3px,
        hsla(210, 50%, 85%, 1) 4px,
        transparent 4px
      ),
      radial-gradient(
        circle at 85% 34%,
        transparent 0,
        transparent 2px,
        hsla(210, 50%, 85%, 1) 3px,
        hsla(210, 50%, 85%, 1) 4px,
        transparent 4px
      ),
      radial-gradient(
        circle at 90% 42%,
        transparent 0,
        transparent 2px,
        hsla(210, 50%, 85%, 1) 3px,
        hsla(210, 50%, 85%, 1) 4px,
        transparent 4px
      ),
      radial-gradient(
        circle at 46% 52%,
        transparent 0,
        transparent 4px,
        hsla(210, 50%, 85%, 1) 5px,
        hsla(210, 50%, 85%, 1) 6px,
        transparent 6px
      );
    width: 100%;
    height: 300%;
    top: 0;
    left: 0;
    position: absolute;
    animation: bubbles 1s linear infinite both;
  }

  @keyframes bubbles {
    from {
      transform: translate();
    }
    to {
      transform: translate(0, -66.666%);
    }
  }
  @media only screen and (max-width: 950px) {
    font-size: 20px;
    padding: 10px 20px;
    text-align: center;
  }
  
`;

export const ButtonParticipar = styled.button`
  position: relative;
  padding: 15px;
  width: 100%;
  border: none;
  text-align: center;
  background: none;
  cursor: pointer;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-size: 22px;
  margin: auto;
  background: linear-gradient(to bottom right, transparent, #723172);
  box-shadow: rgb(255, 255, 255, 0.5) 0px 0px 2px;
  border-radius: 5px;
  z-index: 0;
  overflow: hidden;
  display: flex;
  color: white;
  transition: all 0.9s;
  justify-content: center;
  opacity: 0.7;

  :hover {
    box-shadow: rgb(255, 255, 255, 1) 2px 2px 20px;
    background: linear-gradient(to bottom right, green, #723172);
    opacity: 1;
  }
  :disabled {
    opacity: 0.6; /* Reduz a opacidade quando o botão está desativado */
    cursor: not-allowed; /* Muda o cursor para 'not-allowed' quando o botão está desativado */
    background: linear-gradient(to bottom right, black, #4b0082);
  }
  
  @media only screen and (max-width: 950px) {
    font-size: 20px;
    padding: 10px 20px;
    text-align: center;
  }
  
`;
