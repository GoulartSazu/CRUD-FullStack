import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const Global = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    font-family: 'roboto', sans-serif;
  }
  
  body {
    overflow-x: hidden;
    background-image: url('https://www.tratorcase.com.br/wp-content/uploads/2024/02/carros-scaled.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: repeat;
    position: relative;
    top: 0;
    margin-top: 0;
    background-attachment: fixed;
    background-size: 60%;
    position: relative;
    ::after {
      content: "";
      width: 100%;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      position: absolute;
      background-color: black;
      opacity: 0.6;
      z-index: -9;
      height: 100%;
    }
  }
`;

export const Container = styled.div`
  width: 95%;
  margin: auto;
  max-width: 1800px;
`;

export default Global;