import styled from "styled-components";

export const Head = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to bottom right, #800080, #4B0082);
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

  h1 {
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-left: 100px;
    font-weight: 300;
    font-size: 40px;
  }
  @media only screen and (max-width: 600px) {
  img {
    width: 100px;
  }
  height: 55px;
}
  

`;
