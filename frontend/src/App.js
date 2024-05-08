import GlobalStyle from "./styles/global";
import Home from "../src/Pages/Home/Home.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Agendamentos from "./Pages/Agendamentos/Agendamentos.js";
import Dashboard from "./Pages/Dashboard/Dashboard.js";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import Gerenciar from "./Pages/Gerenciar/Gerenciar.js";
import Aprovar from "./Pages/Aprovar/Aprovar.js";
import Finalizacao from "./Pages/Finalizacao/Finalizacao.js";
import FeedBack from "./Pages/FeedBack/FeedBack.js";
import FeedBackList from "./Pages/FeedBackList/FeedBackList.js";
import Modal from 'react-modal';

function App() {
  Modal.setAppElement('#root');

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agendamento" element={<Agendamentos />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/aprovar-horarios" element={<Aprovar />} />
        <Route path="/dashboard/gerenciar-horarios" element={<Gerenciar />} />
        <Route path="/dashboard/lista-feedbacks" element={<FeedBackList/>} />
        <Route path="/finalizacao" element={<Finalizacao/>} />
        <Route path="/feedback" element={<FeedBack/>} />
      </Routes>
      <ToastContainer autoClose={5000} position={toast.POSITION.TOP_RIGHT} />
      <GlobalStyle />
      <Footer />
    </Router>
  );
}
export default App;
