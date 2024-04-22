import styled from "styled-components";

export const Detalhes = styled.div`
  padding: 20px 40px;
  h3 {
    font-size: 18px;
    text-align: center;
    letter-spacing: 1px;
    font-weight: 500;
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

export const Button = styled.button`
  font-size: 18px;
  text-align: center;
  padding: 10px 30px;
  border-radius: 5px;
  width: 20%;
  border: none;
  background: linear-gradient(to bottom right, #00ff20, #01980d,#005006);
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

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;
