import styled from "styled-components";

export const Confirmation = styled.div`
  color: white;
  letter-spacing: 1px;

  strong {
    padding: 5px 20px;
    border-radius: 5px;
  }

  .REPROVAR {
    background: linear-gradient(to bottom right, #ff0000, #900000, #6e0000);
  }
  .CANCELAR {
    background: linear-gradient(to bottom right, #4e4c4c, #272424, #000000);
  }
  .APROVAR {
    background: linear-gradient(to bottom right, #00ff20, #01980d, #005006);
  }

  h2 {
    text-align: center;
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  span {
    background-color: white;
    padding: 5px 10px 5px;
    color: #4b0082;
    border-radius: 2px;
  }

  div {
    display: flex;
    justify-content: space-between;
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
    strong {
    padding: 1px 10px;
    border-radius: 2px;
  }
  div {
    flex-direction: column;
  }
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

export const Detalhes = styled.div`
  padding: 20px 40px;
  h3 {
    font-size: 18px;
    text-align: center;
    letter-spacing: 1px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  div {
    display: flex;
    justify-content: center;
    gap: 20px;
    div {
      width: 100%;
      padding: 20px 0;
      margin-bottom: 20px;
      box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.9);
      border-radius: 5px;
    }
  }
`;

export const TextField = styled.input`
  width: 20%;
  font-size: 14px;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  background: linear-gradient(to bottom right, #800080, #4b0082);
  color: white;
  letter-spacing: 1px;
  cursor: pointer;
  border: none;
  box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.9);
  font-weight: 300;
  margin: 20px 0px;
  line-height: 24px;
  justify-content: center;
  display: flex;
  color: white;

  :hover {
    cursor: pointer;
  }
  :focus-visible {
    border: none;
    outline: none;
  }
  ::placeholder {
    color: white;
    opacity: 0.7;
  }
`;

export const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonAtualizar = styled.button`
font-size: 30px;
text-align: center;
border-radius: 5px;
border: none;
color: white;
letter-spacing: 1px;
cursor: pointer;
background-color: transparent;
border: none;
font-weight: 400;
margin: 20px 0px;
line-height: 24px;
justify-content: center;
display: flex;
transition: all 0.3s;
opacity: 0.5;
pointer-events: none;

:hover {
  cursor: not-allowed;
  filter: brightness(130%);
}
:focus-visible {
  border: none;
  outline: none;
}
::placeholder {
  color: white;
  opacity: 0.7;
}
`;

export const Button = styled.button`
  font-size: 18px;
  text-align: center;
  padding: 10px 30px;
  border-radius: 5px;
  width: 20%;
  border: none;
  background: linear-gradient(to bottom right, #00ff20, #01980d, #005006);
  color: white;
  letter-spacing: 1px;
  cursor: pointer;
  border: none;
  box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.9);
  font-weight: 400;
  margin: 20px 0px;
  line-height: 24px;
  justify-content: center;
  display: flex;
  color: white;
  transition: all 0.3s;
  opacity: 0.5;
  pointer-events: none;

  :hover {
    cursor: not-allowed;
    filter: brightness(130%);
  }
  :focus-visible {
    border: none;
    outline: none;
  }
  ::placeholder {
    color: white;
    opacity: 0.7;
  }
`;

export const ButtonConfirm = styled.button`
  font-size: 18px;
  text-align: center;
  padding: 10px 30px;
  border-radius: 5px;
  border: none;
  background: linear-gradient(to bottom right, #00ff20, #01980d, #005006);
  color: white;
  letter-spacing: 1px;
  cursor: pointer;
  border: none;
  box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.9);
  font-weight: 300;
  margin: 20px 0px;
  justify-content: center;
  display: flex;
  color: white;
  transition: all 0.3s;
  opacity: 1;
  align-items: center;
  
  :hover {
    filter: brightness(120%);
  }
  :focus-visible {
    border: none;
    outline: none;
  }
  ::placeholder {
    color: white;
    opacity: 0.7;
  }
`;

export const ButtonVoltar = styled.button`
  font-size: 18px;
  text-align: center;
  padding: 10px 30px;
  border-radius: 5px;
  border: none;
  background: linear-gradient(to bottom right, #a4af00, #8c9600, #72790b);
  color: white;
  letter-spacing: 1px;
  cursor: pointer;
  border: none;
  box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.9);
  font-weight: 300;
  margin: 20px 0px;
  justify-content: center;
  display: flex;
  color: white;
  transition: all 0.3s;
  opacity: 1;
  align-items: center;

  :hover {
    filter: brightness(120%);
  }
  :focus-visible {
    border: none;
    outline: none;
  }
  ::placeholder {
    color: white;
    opacity: 0.7;
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;
