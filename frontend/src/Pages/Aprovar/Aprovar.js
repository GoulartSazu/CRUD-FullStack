import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TextField, Button, Detalhes } from "./Styles";
import DataTable from "react-data-table-component";
import { Container } from "../../styles/global";

const FilterGlobal = ({ filterText, onFilter, selectedRows }) => (
  <>
    <Button
      type="button"
      className={selectedRows?.length > 0 ? "active" : "inative"}
      onChange={onFilter}
    >
      APROVAR
    </Button>
    {console.log("kkkkk", selectedRows)}
    <Button
      id="reprovar"
      type="button"
      className={selectedRows?.length > 0 ? "active" : "inative"}
      onChange={onFilter}
    >
      REPROVAR
    </Button>
    <Button
      id="cancelar"
      type="button"
      className={selectedRows?.length > 0 ? "active" : "inative"}
      onChange={onFilter}
    >
      CANCELAR
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
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [filterText, setFilterText] = useState("");
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

    return (
      <>
        <FilterGlobal
          onFilter={(e) => setFilterText(e.target.value)}
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
      setAgendamentos(res.data);
      setLoading(false);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    console.log("state", selectedRows);
  }, [selectedRows]);

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
      width: "120px",
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
      width: "250px",
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
      width: "150px",
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
              console.log(row?.id);
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
              console.log(row?.id);
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
              console.log(row.id);
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
      <h3>DETALHES DO AGENDAMENTO NÚMERO {props.data?.id}</h3>
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
