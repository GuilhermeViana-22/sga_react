import React, { useState, useEffect, useRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CardContent} from '@material-ui/core';
import axios from '../../api';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-dt/js/dataTables.dataTables.min.js';
import 'datatables.net/js/jquery.dataTables';
import BasicModal from '../Elements/Modal';
import DeleteIcon from "@material-ui/icons/Delete";
import Button from '@material-ui/core/Button';
import Swal from "sweetalert2";


const columns = [
    { id: 'id', label: 'Protocolo' },
    { id: 'descricao', label: 'Descrição' },
    { id: 'created_at', label: 'Data cadastro' },
    { id: 'acoes', label: 'Ações' },
];

function TabelaUnidade() {
    const [results, setTableData ] = useState([]);
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
        axios.get('/unidade')
            .then(response => {
                const results = response.data.data;
                console.log(results)
                setTableData(results);

                // Verifique se o DataTable já foi inicializado na tabela
                const table = $('#unidades').DataTable();
                if ($.fn.DataTable.isDataTable('#unidades')) {
                    table.destroy();
                }

                // Inicialize o DataTable aqui
                $(document).ready(function() {
                    $('#unidades').DataTable({
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
            <CardContent>
                <Table id="unidades" ref={tableRef}>
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
                                <TableCell>{result.descricao}</TableCell>
                                <TableCell>{result.created_at}</TableCell>
                                <TableCell>{result.descricao}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </CardContent>
        </TableContainer>

    );
}

export default TabelaUnidade;