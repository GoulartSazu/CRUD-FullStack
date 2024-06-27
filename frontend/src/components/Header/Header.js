import { useState } from "react";
import { Head } from "./Styles";
import logo from "../../images/logo-horizontal.png";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [login] = useState(
    localStorage.getItem("log") === "PÃO DA VÓ" ?? false
  );

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
      if (word.toLowerCase() === "feedback") {
        return "Avaliar";
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  return (
    <Head>
      <h1>{title}</h1>
      <div>
        {login && (
          <Link to={`/dashboard/aprovar-horarios`} className="ancora">
            DASHBOARD
          </Link>
        )}
        <Link to={`/agendamento`} className="ancora">
          AGENDAR
        </Link>
        <Link to={`/feedback`} className="ancora">
          AVALIAR
        </Link>
        {login && (
          <Link to={`/dashboard/lista-feedbacks`} className="ancora">
            FEEDBACKS
          </Link>
        )}
        <Link to="/" className="link">
          <img src={logo} alt="Logo Splash" />
        </Link>
      </div>
    </Head>
  );
};

export default Header;
