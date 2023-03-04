import React, { useState, useEffect, useRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
import axios from '../../api';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-dt/js/dataTables.dataTables.min.js';
import 'datatables.net/js/jquery.dataTables';
import BasicModal from '../Elements/Modal';
import DeleteIcon from "@material-ui/icons/Delete";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@material-ui/core/Button';
import theme from '../styles/theme';

const columns = [
    { id: 'id', label: 'Código ' },
    { id: 'Consultório', label: 'Consultório' },
    { id: 'ativo', label: 'Disponível' },
    { id: 'acoes', label: 'Ações' },
];

function Tabela() {
    const [results, setTableData, ] = useState([]);
    const tableRef = useRef(null);

    //chamadas para abertura e fehcamento de modal
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const handleOpen = (id) => {
        setSelectedId(id);
        setOpen(true);
    };
    const handleClose = () => {
        setSelectedId(null);
        setOpen(false);
    };

    useEffect(() => {
        axios.get('')
            .then(response => {
                const results = response.data.data;
                console.log(results)
                setTableData(results);

                // Verifique se o DataTable já foi inicializado na tabela
                const table = $('#consultorios').DataTable();
                if ($.fn.DataTable.isDataTable('#consultorios')) {
                    table.destroy();
                }

                // Inicialize o DataTable aqui
                $(document).ready(function() {
                    $('#consultorios').DataTable({
                        language: {
                            url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Portuguese-Brasil.json'
                        },
                        deferRender: true,
                        destroy: true // adicione essa opção
                    });
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (tableRef.current) {
            $(tableRef.current).DataTable();
        }
    }, [results]);

    return (
        <TableContainer className={'tabela'} component={Paper}>
            <Table id="consultorios" ref={tableRef}>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell id={"header"} key={column.id}>{column.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {results.map((result) => (
                        <TableRow key={result.id}>
                            <TableCell>{result.id}</TableCell>
                            <TableCell>{result.consultorio}</TableCell>
                            <TableCell>{(Number(result.ativo) === 1) ? 'Disponível' : 'Não'}</TableCell>
                            <TableCell>
                                <Button  onClick={() => handleOpen(result.id)} variant="contained" color="secondary" startIcon={<DeleteIcon />} > Excluir</Button>
                                {(selectedId === result.id) && <BasicModal open={open} handleClose={handleClose}  id={ result.id} nome={result.consultorio} />}

                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Tabela;
