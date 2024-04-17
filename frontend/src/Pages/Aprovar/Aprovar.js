import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { TextField, Button } from "./Styles";
import DataTable from "react-data-table-component";
import { Container } from "../../styles/global";

const FilterGlobal = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="FILTRE POR PLACA, NOME OU SERVIÇO"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
  </>
);

const Aprovar = ({ users, setUsers, setOnEdit }) => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [filterText, setFilterText] = useState("");
  const [filterTextService, setFilterTextService] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [selectedLinha, setSelectedLinha] = useState([]);
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

    return (
      <>
        <FilterGlobal
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
      </>
    );
  }, [filterText, resetPaginationToggle, filterTextService]);

  const getAgendamentos = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8800/agendamento/getAgendamentos"
      );
      setAgendamentos(res.data);
      setLoading(false);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (loading) {
      getAgendamentos();
    }
  }, [loading]);

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const columns = [
    {
      name: "Placa",
      selector: (row) => row.veiculo_placa ?? "-",
      sortable: true,
    },
    {
      name: "Valor",
      selector: (row) => parseFloat(row.valor_total),
      sortable: true,
      width: "150px",
      format: (row) => `R$ ${row.valor_total},00`,
    },
    {
      name: "Serviço",
      selector: (row) => row.servico,
      sortable: true,
      width: "250px",
    },
    {
      name: "Tamanho",
      selector: (row) => row.tamanho_veiculo,
      sortable: true,
    },
    {
      name: "Local",
      selector: (row) => row.local,
      sortable: true,
    },
    {
      name: "Data",
      selector: (row) => row.data_agendamento,
      sortable: true,
      width: "150px",
      format: (row) => formatDate(row.data_agendamento),
    },
    {
      name: "Horário",
      selector: (row) => row.horario_agendamento,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Nome",
      selector: (row) => row.nome_dono_veiculo ?? "-",
      sortable: true,
    },
    {
      name: "Telefone",
      selector: (row) => row.telefone_dono_veiculo ?? "-",
    },
    {
      name: "Inserido Em",
      selector: (row) => row.date_insert,
      sortable: true,
      width: "150px",
      format: (row) => formatDate(row.date_insert),
    },
  ];

  const MyExpander = (props) => <div>{props.data.tamanho_veiculo}</div>;

  const customStyles = {
    rows: {
      style: {
        fontSize: "16px",
        letterSpacing: "1px", // Defina o tamanho da fonte desejado
      },
    },
    headCells: {
      style: {
        fontSize: "18px", // Defina o tamanho da fonte do cabeçalho desejado
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

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `SAZU = :\r ${selectedRows.map((r) => r.veiculo_placa)}?`
        )
      ) {
        setToggleCleared(!toggleCleared);
      }
    };

    return (
      <Button
        key="delete"
        onClick={handleDelete}
        style={{ backgroundColor: "red" }}
        icon
      >
        Delete
      </Button>
    );
  }, [filteredItems, selectedRows, toggleCleared]);

  return (
    <>
      <Container>
        {!login ? (
          <input
            className="log"
            onChange={(e) => {
              if (e.target.value === "PÃO DA VÓ") {
                localStorage.setItem("log", e.target.value);
                setLogin(true);
              }
            }}
          ></input>
        ) : (
          <div className="dataTable">
            <DataTable
              // dense - Para compactar
              clearSelectedRows={toggleCleared}
              columns={columns}
              data={filteredItems}
              contextActions={contextActions}
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
