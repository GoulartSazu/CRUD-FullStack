import React from "react";
import { Head } from "./Styles";
import logo from "../../images/logo-horizontal.png";

const Header = () => {
  const title = window.location.pathname
    .split("/")
    .pop()
    .split("-")
    .map(word => {
      if (word.toLowerCase() === 'horarios') {
        return 'Horários';
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  return (
    <Head>
      <h1>{title}</h1>
      <img src={logo} alt="Logo Splash" />
    </Head>
  );
};

export default Header;
