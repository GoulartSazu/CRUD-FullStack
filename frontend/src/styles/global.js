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
    height: 100vh;
    background-attachment: fixed;
    background-size: 60%;
    position: relative;
    ::after {
      content: "";
      width: 100%;
      top: 0px;
      height: 100%;
      position: absolute;
      background-color: black;
      opacity: 0.5;
      z-index: -9;
    }
  }
`;

export const Container = styled.div`
  width: 95%;
  margin: auto;
  max-width: 1800px;
`;

export default Global;