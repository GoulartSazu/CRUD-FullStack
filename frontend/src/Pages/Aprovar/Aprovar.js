import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TextField, Button, Detalhes } from "./Styles";
import DataTable from "react-data-table-component";
import { Container } from "../../styles/global";
import Modal from "react-modal";
import ConfirmationAcao from "./ConfirmationAcao.js";

const FilterGlobal = ({ filterText, onFilter, selectedRows, handleClick }) => (
  <>
    <Button
      type="button"
      className={selectedRows?.length > 0 ? "active" : "inative"}
      onClick={() => handleClick("APROVAR")}
    >
      APROVAR ✔️
    </Button>
    <Button
      id="reprovar"
      type="button"
      className={selectedRows?.length > 0 ? "active" : "inative"}
      onClick={() => handleClick("REPROVAR")}
    >
      REPROVAR ❌
    </Button>
    <Button
      id="cancelar"
      type="button"
      className={selectedRows?.length > 0 ? "active" : "inative"}
      onClick={() => handleClick("CANCELAR")}
    >
      CANCELAR ❗️
    </Button>
    <TextField
      id="search"
      type="text"
      placeholder="FILTRE POR PLACA, NOME OU SERVIÇO 🔎"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
  </>
);

const Aprovar = ({ users, setUsers, setOnEdit }) => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentWidth, setContentWidth] = useState("40%");
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [infosAgendamento, setInfosAgendamento] = useState({});
  const [filterTextService, setFilterTextService] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [login, setLogin] = useState(
    localStorage.getItem("log") === "PÃO DA VÓ" ?? false
  );
  const filteredItems = agendamentos.filter(
    (item) =>
      (item.veiculo_placa &&
        item.veiculo_placa.toUpperCase().includes(filterText.toUpperCase())) ||
      (item.servico &&
        item.servico.toUpperCase().includes(filterText.toUpperCase())) ||
      (item.nome_dono_veiculo &&
        item.nome_dono_veiculo.toUpperCase().includes(filterText.toUpperCase()))
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
      if (filterTextService) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterTextService("");
      }
    };

    const handleClick = (acao) => {
      if (selectedRows.length > 0) {
        const id = selectedRows[0]?.id;
        if (acao === "APROVAR") {
          setInfosAgendamento({ id, acao: "APROVAR" });
        } else if (acao === "REPROVAR") {
          setInfosAgendamento({ id, acao: "REPROVAR" });
        } else if (acao === "CANCELAR") {
          setInfosAgendamento({ id, acao: "CANCELAR" });
        }
        setIsModalOpen(true);

        const contentElement = document.querySelector(".content");
        if (contentElement) {
          contentElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    return (
      <>
        <FilterGlobal
          onFilter={(e) => setFilterText(e.target.value)}
          handleClick={handleClick}
          selectedRows={selectedRows}
          onClear={handleClear}
          filterText={filterText}
        />
      </>
    );
  }, [filterText, resetPaginationToggle, filterTextService, selectedRows]);

  const getAgendamentos = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8800/agendamento/getAgendamentos"
      );
      setSelectedRows([]);
      setToggleClearRows(!toggledClearRows);
      setAgendamentos(res.data);
      setLoading(false);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (loading) {
        await getAgendamentos();
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, agendamentos]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 950) {
        setContentWidth("inherit");
      } else {
        setContentWidth("40%");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const formatServicoLocal = (servicoLocal) => {
    switch (servicoLocal) {
      case "LAVAGEMCOMPLETA":
        return "LAVAGEM COMPLETA";
      case "ESPACOSPLASH":
        return "ESPAÇO SPLASH";
      case "LEVATRAS":
        return "LEVA E TRAZ";
      default:
        return servicoLocal;
    }
  };

  const columns = [
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "150px",
      reorder: true,
    },
    {
      name: "Data",
      selector: (row) => row.data_agendamento,
      sortable: true,
      width: "150px",
      reorder: true,
      format: (row) => formatDate(row.data_agendamento),
    },
    {
      name: "Horário",
      selector: (row) => row.horario_agendamento,
      sortable: true,
      width: "115px",
      reorder: true,
    },
    {
      name: "Serviço",
      selector: (row) => formatServicoLocal(row.servico),
      sortable: true,
      width: "250px",
      reorder: true,
    },
    {
      name: "Local",
      selector: (row) => formatServicoLocal(row.local),
      sortable: true,
      width: "200px",
      reorder: true,
    },
    {
      name: "Endereço",
      selector: (row) => row.endereco,
      sortable: false,
      width: "350px",
      reorder: true,
    },
    {
      name: "Valor",
      selector: (row) => parseFloat(row.valor_total),
      sortable: true,
      width: "120px",
      format: (row) => `R$ ${row.valor_total},00`,
      reorder: true,
    },
    {
      name: "Ações",
      cell: (row) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            type="button"
            className={selectedRows?.[0]?.id === row?.id ? "active" : "inative"}
            onClick={(e) => {
              e.preventDefault();
              setInfosAgendamento({ id: row?.id, acao: "APROVAR" });
              setIsModalOpen(true);
            }}
          >
            ✔️
          </Button>
          <Button
            id="reprovar"
            type="button"
            className={selectedRows?.[0]?.id === row?.id ? "active" : "inative"}
            onClick={(e) => {
              e.preventDefault();
              setInfosAgendamento({ id: row?.id, acao: "REPROVAR" });
              setIsModalOpen(true);
            }}
          >
            ❌
          </Button>
          <Button
            id="cancelar"
            type="button"
            className={selectedRows?.[0]?.id === row?.id ? "active" : "inative"}
            onClick={(e) => {
              e.preventDefault();
              setInfosAgendamento({ id: row?.id, acao: "CANCELAR" });
              setIsModalOpen(true);
            }}
          >
            ❗️
          </Button>
        </div>
      ),
      allowOverflow: true,
      button: true,
      width: "300px",
      reorder: true,
    },
  ];

  const MyExpander = (props) => (
    <Detalhes>
      <h3>
        DETALHES DO AGENDAMENTO NÚMERO <strong>{props.data?.id}</strong>
      </h3>
      <div>
        <div>ENDEREÇO COMPLETO 📍 {props.data?.endereco}</div>
        <div>TAMANHO DO VEÍCULO 🚗 {props.data?.tamanho_veiculo}</div>
      </div>
      <div>
        <div>STATUS 🔥 {props.data?.status}</div>
        <div>TIPO DO SERVIÇO 🚿 {formatServicoLocal(props.data?.servico)}</div>
      </div>
      <div>
        <div>
          DATA DATA LAVAGEM 📅 {formatDate(props.data?.data_agendamento)}
        </div>
        <div>HORÁRIO 🕒 {props.data?.horario_agendamento}</div>
      </div>
      <div>
        <div>LOCAL 📌 {formatServicoLocal(props.data?.local)}</div>
        <div>VALOR TOTAL 💸 R${props.data?.valor_total},00</div>
      </div>
      <div>
        <div>PLACA 🚘 {props.data?.veiculo_placa ?? "(NÃO PREENCHIDO)"}</div>
        <div>
          DONO DO VEÍCULO 👦🏻{" "}
          {props.data?.nome_dono_veiculo ?? "(NÃO PREENCHIDO)"}
        </div>
      </div>
      <div>
        <div>
          TELEFONE 📱 {props.data.telefone_dono_veiculo ?? "(NÃO PREENCHIDO)"}
        </div>
        <div>INSERIDO EM 📁 {formatDate(props.data?.date_insert)}</div>
      </div>
    </Detalhes>
  );
  const customStyles = {
    rows: {
      style: {
        fontSize: "16px",
        letterSpacing: "1px",
        whiteSpace: "normal",
      },
    },
    cells: {
      style: {
        whiteSpace: "normal",
      },
    },
    headCells: {
      style: {
        fontSize: "18px",
      },
    },
  };

  const conditionalRowStyles = [
    {
      when: (row) => row.status === "PENDENTE",
      style: {
        backgroundColor: "rgba(0, 63, 163, 0.4)",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.status === "APROVADO",
      style: {
        backgroundColor: "rgba(0, 128, 0, 0.9)",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.status === "CANCELADO",
      style: {
        backgroundColor: "rgba(108, 108, 108, 1)",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.status === "REPROVADO",
      style: {
        backgroundColor: "rgba(242, 38, 19, 0.9)",
        color: "white",
        "&:hover": {
          cursor: "not-allowed",
        },
      },
    },
  ];

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  return (
    <>
      <Modal
        style={{
          overlay: {
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            zIndex: "3",
          },
          content: {
            width: contentWidth,
            margin: "auto",
            background:
              "linear-gradient(to bottom right,  #5c0a5c,#0F1B38, #4b0082",
            borderRadius: "10px",
            border: "0px",
            padding: "40px",
            height: "300px",
            display: "flex",
            alignItems: "center",
          },
        }}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <ConfirmationAcao
          data={infosAgendamento}
          onCloseModal={() => setIsModalOpen(false)}
          onGetAgendamentos={() => getAgendamentos()}
        />
      </Modal>
      <Container>
        {!login ? (
          <input
            className="log"
            onChange={(e) => {
              if (e.target.value === "PÃO DA VÓ") {
                setLogin(true);
              }
            }}
          ></input>
        ) : (
          <div className="dataTable">
            <DataTable
              // dense - Para compactar
              clearSelectedRows={toggledClearRows}
              columns={columns}
              data={filteredItems}
              onSelectedRowsChange={handleRowSelected}
              conditionalRowStyles={conditionalRowStyles}
              selectableRows
              selectableRowsHighlight
              selectableRowsSingle
              expandableRowsComponent={MyExpander}
              expandableRows
              expandOnRowClicked
              persistTableHead
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              theme="dark"
              progressPending={!filteredItems}
              fixedHeader
              customStyles={customStyles}
              noDataComponent={<h5>Nenhum agendamento encontrado! 🤔</h5>}
              contextMessage={{
                singular: "AGENDAMENTO",
                plural: "AGENDAMENTO",
                message:
                  "SELECIONADO: " +
                  "PLACA  " +
                  selectedRows[0]?.veiculo_placa +
                  " | VEÍCULO DE TAMANHO " +
                  selectedRows[0]?.tamanho_veiculo +
                  " | SERVIÇO  " +
                  selectedRows[0]?.servico,
              }}
            />
          </div>
        )}
      </Container>
    </>
  );
};

export default Aprovar;
