import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TextField, Detalhes, ButtonAtualizar } from "./Styles.js";
import DataTable from "react-data-table-component";
import { Container } from "../../styles/global.js";

const FilterGlobal = ({ filterText, onFilter, handleClick }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="FILTRE POR PLACA OU MENSAGEM 🔎"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <ButtonAtualizar
      id="atualizar"
      type="button"
      className="active"
      onClick={() => handleClick("ATUALIZAR")}
    >
      🔄
    </ButtonAtualizar>
  </>
);

const FeedBackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [filterTextService, setFilterTextService] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [login, setLogin] = useState(
    localStorage.getItem("log") === "PÃO DA VÓ" ?? false
  );
  const filteredItems = feedbacks.filter(
    (item) =>
      (item.fdb_placa &&
        item.fdb_placa.toUpperCase().includes(filterText.toUpperCase())) ||
      (item.fdb_message &&
        item.fdb_message.toUpperCase().includes(filterText.toUpperCase()))
  );
  const getFeedBacks = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}feedback/getFeedbacks`
      );
      setSelectedRows([]);
      setFilterText("");
      setFilterTextService("");
      setToggleClearRows(!toggledClearRows);
      setFeedbacks(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

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
      if (acao === "ATUALIZAR") {
        return getFeedBacks();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterText, resetPaginationToggle, filterTextService, selectedRows]);

  useEffect(() => {
    const fetchData = async () => {
      if (login) {
        await getFeedBacks();
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (dateString, hours = false) => {
    const date = new Date(dateString);
    if (hours) return date.toLocaleString("pt-BR");
    return date.toLocaleDateString("pt-BR");
  };

  const formatStars = (range) => {
    const ratingTexts = {
      5: "🌟🌟🌟🌟🌟 PERFEITO 🤩",
      4: "🌟🌟🌟🌟 MUITO BOM 😃",
      3: "🌟🌟🌟 MAIS OU MENOS 😶",
      2: "🌟🌟 RUIM 😑",
      1: "🌟 PÉSSIMO 😕",
    };
    return ratingTexts[range];
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "150px",
      reorder: true,
    },
    {
      name: "Nota 🌟",
      selector: (row) => row.fdb_stars,
      sortable: true,
      width: "350px",
      reorder: true,
      format: (row) => formatStars(row.fdb_stars),
    },
    {
      name: "Comentário",
      selector: (row) => row.fdb_message,
      sortable: true,
      width: "600px",
      reorder: true,
    },
    {
      name: "Placa",
      selector: (row) => row.fdb_placa,
      sortable: true,
      width: "250px",
      reorder: true,
    },
    {
      name: "Avaliado Em",
      selector: (row) => row.date_insert,
      sortable: true,
      width: "250px",
      reorder: true,
      format: (row) => formatDate(row.date_insert),
    }
  ];

  const MyExpander = (props) => (
    <Detalhes>
      <h3>
        DETALHES DO FEEDBACK DE NÚMERO <strong>{props.data?.id}</strong>
      </h3>
      <div>
        <div>COMENTÁRIO COMPLETO 🔥<br /> {props.data?.fdb_message}</div>
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
        backgroundColor: "rgba(52, 0, 80, 0.9)",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.status === "APROVADO",
      style: {
        backgroundColor: "rgba(0, 63, 163, 0.4)",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.status === "FINALIZADO",
      style: {
        backgroundColor: "rgba(0, 128, 0, 0.9)",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.free_servico === 1,
      style: {
        backgroundColor: "rgba(173, 190, 31, 0.9)",
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
      <Container>
        {!login ? (
          <input
            className="log"
            onChange={(e) => {
              if (e.target.value === "PÃO DA VÓ") {
                setLogin(true);
                getFeedBacks();
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
              noDataComponent={<h5>Nenhum feedback encontrado! 🤔</h5>}
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

export default FeedBackList;
