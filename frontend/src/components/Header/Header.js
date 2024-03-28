import React from "react";
import { Head } from "./Styles";
import logo from "../../images/logo-horizontal.png";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const title = pathname
    .split("/")
    .pop()
    .split("-")
    .map((word) => {
      if (word.toLowerCase() === "horarios") {
        return "Horários";
      }
      if (word.toLowerCase() === "finalizacao") {
        return "Finalização";
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  return (
    <Head>
      <h1>{title}</h1>
      <Link to="/" className="link">
        <img src={logo} alt="Logo Splash" />
      </Link>
    </Head>
  );
};

export default Header;
