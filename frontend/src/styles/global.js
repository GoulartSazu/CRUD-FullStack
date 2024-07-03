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
      opacity: 0.8;
      z-index: -9;
      height: 100%;
    }
  }
  /* * {
    border: 1px solid red;
  } */
`;

export const Container = styled.div`
  width: 95%;
  margin: auto;
  max-width: 1800px;
  .log {
    width: 100%;
    height: 200px;
    font-size: 55px;
    padding: 100px;
    border-radius: 5px;
    background: linear-gradient(to bottom right, #800080, #4b0082);
    color: white;
    letter-spacing: 5px;
    cursor: pointer;
    border: none;
    box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.9);
    font-weight: 300;
    width: 60%;
    margin: 200px auto;
    line-height: 24px;
    justify-content: center;
    display: flex;

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
  .dataTable {
    margin: 50px auto;
    header {
      justify-content: space-between;
    }
    .rdt_TableCell {
      input {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background: papayawhip;
        border-radius: 0px;
        border: 0px solid #ccc;
        outline: none;
        cursor: pointer;
        position: relative;
        &::after {
          content: "🧼";
          position: absolute;
          top: 1.5px;
          left: 2px;
          font-size: 20px;
          width: 50px;
          height: 50px;
          opacity: 0.2;
        }

        &:checked {
          background: rgba(147, 255, 0, 1);
          &::after {
            visibility: visible;
            opacity: 1;
          }
        }

        &:hover {
          background: rgba(147, 255, 0, 0.9);
          &::after {
            visibility: visible;
            opacity: 1;
          }
        }

        width: 30px;
        height: 30px;
      }
    }
  }
  h5 {
    margin: 50px auto;
    font-size: 30px;
    letter-spacing: 3px;
    font-weight: 400;
  }
  #reprovar {
    background: linear-gradient(to bottom right, #ff0000, #900000, #6e0000);
  }
  #aprovar{
    background: linear-gradient(to bottom right, #3661bb, #224eac, #03205e);
  }
  #cancelar {
    background: linear-gradient(to bottom right, #4e4c4c, #272424, #000000);
  }
  .active {
    opacity: 1 !important;
    pointer-events: all !important;
    :hover {
      cursor: pointer !important;
    }
  }
  @media only screen and (max-width: 950px) {
    width: inherit;
    .dataTable {
      header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        button,
        input {
          width: 85%;
          margin: 10px auto;
          display: flex;
        }
      }
    }
    .mob {
      width: 100%;
      font-size: 14px;
    }
  }
`;

export default Global;
