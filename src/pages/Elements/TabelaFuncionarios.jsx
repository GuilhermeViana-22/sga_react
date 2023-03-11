import React, { useState, useEffect, useRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CardContent} from '@material-ui/core';
import axios from '../../api';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-dt/js/dataTables.dataTables.min.js';
import 'datatables.net/js/jquery.dataTables';
import Button from "@material-ui/core/Button";

const columns = [
    { id: 'id', label: 'Protocolo',   width: '1%' },
    { id: 'name', label: 'Nome',   width: '20%' },
    { id: 'email', label: 'E-mail',   width: '10%' },
    { id: 'cpf', label: 'CPF',   width: '10%' },
    { id: 'cns', label: 'CNS',   width: '5%' },
    { id: 'created_at', label: 'Data Cadastro',   width: '5%' },
    { id: 'acoes', label: 'Ações',   width: '20%' },
];

function TabelaFuncionarios() {

    //guarda o estado da tabela
    const [results, setTableData ] = useState([]);
    const tableRef = useRef(null);

    useEffect(() => {
        axios.get('/users')
            .then(response => {
                const results = response.data.data;
                setTableData(results);

                // Verifique se o DataTable já foi inicializado na tabela
                const table = $('#users').DataTable();
                if ($.fn.DataTable.isDataTable('#users')) {
                    table.destroy();
                }

                // Inicialize o DataTable aqui
                $(document).ready(function() {
                    $('#users').DataTable({
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
                <Table id="users" ref={tableRef}>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell id={"header"} style={{ width: column.width }} key={column.id}>{column.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((result) => (
                            <TableRow key={result.id}>
                                <TableCell>{result.id}</TableCell>
                                <TableCell>{result.name}</TableCell>
                                <TableCell>{result.email}</TableCell>
                                <TableCell>{result.cpf}</TableCell>
                                <TableCell>{result.cns}</TableCell>
                                <TableCell>{result.created_at}</TableCell>
                                <TableCell>
                                    <Button style={{marginLeft: '5px'}} size="small" variant="contained" color="primary" type="submit">
                                        <i className="fa-solid fa-eye"></i> Visualizar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </CardContent>
        </TableContainer>

    );
}

export default TabelaFuncionarios;
