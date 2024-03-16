import styled from "styled-components";

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
  border-radius: 5px;
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
  flex-direction: column;
`;

export const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

export const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;
