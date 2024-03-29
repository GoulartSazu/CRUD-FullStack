import styled from "styled-components";

export const Agendamento = styled.div`
  h2 {
    color: white;
    font-size: 60px;
    font-weight: 600;
    letter-spacing: 2px;
    margin: 100px auto;
    width: 72%;
    text-align: center;
    height: 150px;
  }
  @media only screen and (max-width: 600px) {
    h2 {
      margin: 40px auto;
      font-size: 20px;
      height: 100px;
    }
  }

`;
