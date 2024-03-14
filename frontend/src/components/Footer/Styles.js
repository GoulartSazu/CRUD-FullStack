import styled from "styled-components";

export const Foot = styled.div`
  background: linear-gradient(to bottom right, #800080, #4b0082);
  position: relative;
  padding: 20px 0;
  margin-top: 300px;

  .container {
    max-width: 1170px;
    margin: auto;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  ul {
    list-style: none;
  }
  .footer {
    background-color: #24262b;
    padding: 70px 0;
  }
  .footer-col {
    width: 30%;
    padding: 0 15px;
  }
  .footer-col h4 {
    font-size: 16px;
    letter-spacing: 1px;
    color: #ffffff;
    text-transform: capitalize;
    margin-bottom: 35px;
    font-weight: 300;
    position: relative;
    justify-content: center;
    display: flex;
  }
  .footer-col h4::before {
    content: "";
    position: absolute;
    left: auto;
    bottom: -15px;
    background-color: purple;
    height: 4px;
    box-sizing: border-box;
    width: 50%;
    border-radius: 20px;
    margin: auto;
  }
  .footer-col ul li:not(:last-child) {
    margin-bottom: 10px;
  }
  span {
    color: transparent;
  }
  .footer-col ul li a {
    font-size: 16px;
    text-transform: capitalize;
    color: #ffffff;
    text-decoration: none;
    display: block;
    transition: all 0.3s ease;
    text-align: center;
    letter-spacing: 1px;

    :hover {
      opacity: 0.5;
    }
  }
  .insta-sazu {
    color: white;
    text-decoration: none;
    transition: all 0.3s;
    :hover {
      opacity: 0.5;
    }
  }
  .footer-col ul li a:hover {
    color: #ffffff;
    margin-bottom: 8px;
    padding-bottom: 10px;
  }
  .footer-col .social-links a {
    display: inline-block;
    height: 40px;
    width: 40px;
    background-color: rgba(255, 255, 255, 0.2);
    margin: 0 10px 10px 0;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    color: #ffffff;
    transition: all 0.5s ease;
  }
  .social-links {
    justify-content: center;
    display: flex;
  }
  .footer-col .social-links a:hover {
    color: #24262b;
    background-color: #ffffff;
  }

  /*responsive*/
  @media (max-width: 767px) {
    .footer-col {
      width: 50%;
      margin-bottom: 30px;
    }
  }
  @media (max-width: 574px) {
    .footer-col {
      width: 100%;
    }
  }
`;
