import React from "react";
import { Head } from "./Styles";
import logo from "../../images/logo-horizontal.png";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const title = pathname
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
