import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { Table, Thead, Tbody, Tr, Th, Td, TextField, ClearButton } from "./Styles";
import DataTable from "react-data-table-component";
import { Container } from "../../styles/global";

const Aprovar = ({ users, setUsers, setOnEdit }) => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
	const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	const filteredItems = agendamentos.filter(
		item => item.veiculo_placa && item.veiculo_placa.toUpperCase().includes(filterText.toUpperCase()),
	);

	const FilterComponent = ({ filterText, onFilter, onClear }) => (
		<>
			<TextField
				id="search"
				type="text"
				placeholder="Filter By Name"
				aria-label="Search Input"
				value={filterText}
				onChange={onFilter}
			/>
			<ClearButton type="button" onClick={onClear}>
				X
			</ClearButton>
		</>
	);

	const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);

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

  const columns = [
    {
      name: "Placa",
      selector: (row) => row.veiculo_placa ?? "-",
      sortable: true,
    },
    {
      name: "Valor Total",
      selector: (row) => row.valor_total,
      sortable: true,
    },
    {
      name: "Serviço",
      selector: (row) => row.servico,
      sortable: true,
    },
    {
      name: "Tamanho do Veículo",
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
    },
    {
      name: "Horário",
      selector: (row) => row.horario_agendamento,
      sortable: true,
    },
    {
      name: "Nome Dono Veículo",
      selector: (row) => row.nome_dono_veiculo,
      sortable: true,
    },
    {
      name: "Telefone Dono Veículo",
      selector: (row) => row.telefone_dono_veiculo,
    },
  ];

	const MyExpander = props => <div>{props.data.tamanho_veiculo}</div>

  return (
    <>
      <Container>
        <DataTable
					title="Contact List"
          columns={columns}
          data={filteredItems}
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
        />
      </Container>
    </>
  );
};

export default Aprovar;
