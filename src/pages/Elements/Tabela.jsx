import React, { useState, useEffect, useRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import axios from '../../api';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-dt/js/dataTables.dataTables.min.js';
import 'datatables.net/js/jquery.dataTables';
import Swal from 'sweetalert2';

const columns = [
    { id: 'id', label: 'Código ' },
    { id: 'Consultório', label: 'Consultório' },
    { id: 'ativo', label: 'Disponível' },
    { id: 'acoes', label: 'Ações' },
];

function Tabela() {
    const [results, setTableData] = useState([]);
    const tableRef = useRef(null);

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
                            <TableCell>{result.acoes}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Tabela;
