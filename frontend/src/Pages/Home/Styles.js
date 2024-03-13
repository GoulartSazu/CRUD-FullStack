import styled from "styled-components";

export const HomePage = styled.div`
  h1 {
    color: white;
    font-size: 60px;
    font-weight: 400;
    letter-spacing: 5px;
    position: absolute;
    top: 45px;
  }

  h2 {
    color: white;
    font-size: 60px;
    font-weight: 600;
    letter-spacing: 2px;
    margin: auto;
    width: 72%;
    text-align: center;
    margin-top: 100px;
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
    font-size: 30px;
    margin: 100px auto;
    background: linear-gradient(to bottom right, #800080, #4b0082);
    box-shadow: rgb(255, 255, 255, 0.5) 0px 0px 55px;
    border-radius: 10px;
    z-index: 0;
    overflow: hidden;
    display: flex;
    color: white;
    transition: all 1s ease;
  }
  .link {
    text-decoration: none !important;
  }
  button:hover {
    box-shadow: rgb(255, 255, 255, 1) 2px 2px 99px;
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
`;
