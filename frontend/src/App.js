import GlobalStyle from "./styles/global";
import styled from "styled-components";
// import { Routes } from "../src/router/Routes.js";
import Home from "../src/Pages/Home/Home.js";
import Form from "./components/FormAgendamento/Form.js";
import Grid from "./components/FormAgendamento/Grid.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Agendamentos from "./Pages/Agendamentos/Agendamentos.js";
import Dashboard from "./Pages/Dashboard/Dashboard.js";
import Header from "./components/Header/Header.js";
import Gerenciar from "./Pages/Gerenciar/Gerenciar.js";
import Aprovar from "./Pages/Aprovar/Aprovar.js";

const Container = styled.div`
  width: 1500px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.usr_nome > b.usr_nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agendamento" element={<Agendamentos />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/aprovar-horarios" element={<Aprovar />} />
        <Route path="/dashboard/gerenciar-horarios" element={<Gerenciar />} />
      </Routes>
      <ToastContainer autoClose={5000} position={toast.POSITION.TOP_RIGHT} />
      <GlobalStyle />
    </Router>
  );
}
{
  /* <Container>
        <Title>USUÁRIOS</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
      </Container> */
}
{
  /* <Routes />
      <ToastContainer autoClose={5000} position={toast.POSITION.TOP_RIGHT} />
      <GlobalStyle /> */
}

export default App;
