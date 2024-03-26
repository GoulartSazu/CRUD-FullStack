import styled from "styled-components";

export const Confirmation = styled.div`
  color: white;
  letter-spacing: 1px;

  h2 {
    text-align: center;
    font-size: 42px;
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
    font-size: 20px;
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
    margin: 0px auto 80px;
    width: 300px;
    font-size: 22px;
    letter-spacing: 2px;
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
`;

export const FormContainer = styled.form`
  align-items: center;
  background-color: #fff;
  padding: 50px;
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  width: 100%;
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
  }
`;

export const SelectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const InputArea = styled.div`
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
    margin: 5px;
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
    width: 30%;
    line-height: 24px;
    :hover {
      box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.9);
      transform: scale(1.05);
    }
    :focus-visible {
      border: none;
      outline: none;
    }
    ::-webkit-calendar-picker-indicator {
      /* Filter para ajustar a cor do ícone para branco */
      filter: brightness(0) invert(1);
      font-size: 30px;
      cursor: pointer;
    }
  }
`;

export const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
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
`;
