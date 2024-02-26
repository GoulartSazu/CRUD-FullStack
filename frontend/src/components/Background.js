import React from "react";
import styled from "styled-components";
import cars from "../images/cars.png";


const Cars = styled.form`
  width: 100%;
  display: flex;
  z-index: -999999;
  img {
    position: absolute;
    width: 100%;
    z-index: -999999;
  }
`;


const Background = () => {

  return (
    <Cars>
      <img src={cars} alt="Carro com espuma"/>
    </Cars>
  );
};

export default Background;
