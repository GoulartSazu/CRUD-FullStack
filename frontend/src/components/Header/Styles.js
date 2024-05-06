import styled from "styled-components";

export const Head = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to bottom right, #800080, #4b0082);
  position: relative;
  height: 110px;

  img {
    position: relative;
    width: 200px;
    transition: all 0.3s;
    :hover {
      filter: brightness(140%);
    }
  }
  div {
    justify-content: center;
    display: flex;
    align-items: center;
    a {
      margin-left: 50px;
    }
  }

  h1 {
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-left: 100px;
    font-weight: 300;
    font-size: 40px;
  }
  .ancora {
    color: white;
    text-decoration: none;
    letter-spacing: 1px;
    font-weight: 300;
    font-size: 30px;
    position: relative;
    ::after {
      content: '';
      position: absolute;
      width: 0%;
      height: 2px;
      background-color: white;
      bottom: -5px;
      left: 0;
      border-radius: 10px;
      transition: all 0.3s;
    }
    :hover {
      ::after {
      width: 100%;
      }

    }
  }
  @media only screen and (max-width: 950px) {
    img {
      width: 100px;
    }
    .ancora {
      display: none;
    }
    height: 55px;
    h1 {
      font-size: 20px;
      top: 9px;
      margin-left: 15px;
    }
  }
`;
