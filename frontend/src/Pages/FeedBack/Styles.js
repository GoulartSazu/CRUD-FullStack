import styled from "styled-components";

export const Finish = styled.div`
  video {
    width: 600px;
    box-shadow: 0px 0px 30px rgba(255, 255, 255, 0.9);
    margin-bottom: 100px;
    border-radius: 10px;
  }
  .star-ratings {
    margin: 50px auto;
    width: 100%;
    justify-content: center;
    display: flex !important;
    @media only screen and (max-width: 950px) {
      svg {
        width: 40px !important;
        height: 40px !important;
      }
    }
  }
  .videos {
    display: flex;
    justify-content: center;
    gap: 100px;
  }
  h1 {
    color: white;
    font-size: 60px;
    font-weight: 400;
    letter-spacing: 5px;
    position: absolute;
    top: 21px;
  }

  h2 {
    color: white;
    font-size: 40px;
    font-weight: 600;
    letter-spacing: 2px;
    margin: auto;
    width: 72%;
    text-align: center;
    margin-top: 100px;
  }
  .nota {
    margin-top: 0px;
  }

  button {
    position: relative;
    padding: 40px;
    border: none;
    background: none;
    cursor: pointer;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 5px;
    font-size: 22px;
    margin: 100px auto;
    background: linear-gradient(to bottom right, #800080, #4b0082);
    box-shadow: rgb(255, 255, 255, 0.5) 0px 0px 55px;
    border-radius: 10px;
    z-index: 0;
    overflow: hidden;
    display: flex;
    color: white;
    transition: all 0.9s;
    display: flex;
    justify-content: space-between;
    align-items: center;
    i {
      color: green;
      margin-left: 10px;
      background-color: white;
      padding: 10px 10px 12px 15px;
      border-radius: 100%;
    }
  }
  .link {
    text-decoration: none !important;
  }
  button:hover {
    box-shadow: rgb(255, 255, 255, 1) 2px 2px 99px;
    border-radius: 1005px;
  }
  /* bubbles */
  button::before {
    content: "";
    pointer-events: none;
    opacity: 0.6;
    background: radial-gradient(
        circle at 20% 35%,
        transparent 0,
        transparent 2px,
        hsla(210, 50%, 85%, 1) 3px,
        hsla(210, 50%, 85%, 1) 4px,
        transparent 4px
      ),
      radial-gradient(
        circle at 5% 50%,
        transparent 0,
        transparent 2px,
        hsla(210, 50%, 85%, 1) 3px,
        hsla(210, 50%, 85%, 1) 4px,
        transparent 4px
      ),
      radial-gradient(
        circle at 25% 45%,
        transparent 0,
        transparent 2px,
        hsla(210, 50%, 85%, 1) 3px,
        hsla(210, 50%, 85%, 1) 4px,
        transparent 4px
      ),
      radial-gradient(
        circle at 75% 44%,
        transparent 0,
        transparent 2px,
        hsla(210, 50%, 85%, 1) 3px,
        hsla(210, 50%, 85%, 1) 4px,
        transparent 4px
      ),
      radial-gradient(
        circle at 70% 40%,
        transparent 0,
        transparent 2px,
        hsla(210, 50%, 85%, 1) 3px,
        hsla(210, 50%, 85%, 1) 4px,
        transparent 4px
      ),
      radial-gradient(
        circle at 85% 34%,
        transparent 0,
        transparent 2px,
        hsla(210, 50%, 85%, 1) 3px,
        hsla(210, 50%, 85%, 1) 4px,
        transparent 4px
      ),
      radial-gradient(
        circle at 90% 42%,
        transparent 0,
        transparent 2px,
        hsla(210, 50%, 85%, 1) 3px,
        hsla(210, 50%, 85%, 1) 4px,
        transparent 4px
      ),
      radial-gradient(
        circle at 46% 52%,
        transparent 0,
        transparent 4px,
        hsla(210, 50%, 85%, 1) 5px,
        hsla(210, 50%, 85%, 1) 6px,
        transparent 6px
      );
    width: 100%;
    height: 300%;
    top: 0;
    left: 0;
    position: absolute;
    animation: bubbles 1s linear infinite both;
  }

  @keyframes bubbles {
    from {
      transform: translate();
    }
    to {
      transform: translate(0, -66.666%);
    }
  }
  @media only screen and (max-width: 950px) {
    h1 {
      font-size: 30px;
      top: 9px;
    }
    img {
      width: 100px;
    }
    h2 {
      font-size: 24px;
      margin: 40px auto auto;
    }
    button {
      margin: 40px auto;
      font-size: 15px;
      padding: 10px;
      width: 88%;
      text-align: center;
      justify-content: center;
    }
    video {
      width: 60%;
      margin: 0 auto 40px;
    }
    .videos {
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 0;
    }
  }
`;
export const Input = styled.textarea`
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  padding: 20px;
  border-radius: 5px;
  background: linear-gradient(to bottom right, #800080, #4b0082);
  color: white;
  letter-spacing: 1px;
  font-size: 20px;
  cursor: text;
  border: none;
  box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.4);
  font-weight: 300;
  transition: all 0.3s;
  transform: ${({ checked }) => (checked ? "scale(1.05)" : "scale(1)")};
  width: 50%;
  line-height: 24px;
  :hover {
    box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.9);
    transform: scale(1);
  }
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
  margin: 50px auto;
  justify-content: center;
  display: flex;
  height: 200px;
  resize: none;
  @media only screen and (max-width: 950px) {
    font-size: 14px;
    height: 100px;
    width: 70%;
  }
`;
