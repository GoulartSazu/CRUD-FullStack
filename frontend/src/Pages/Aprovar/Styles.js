import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 2020px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const TextField = styled.input`
  width: 400px;
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
  margin: 20px;
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

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;
