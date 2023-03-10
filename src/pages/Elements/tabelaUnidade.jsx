import React, { useState, useEffect, useRef } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CardContent,
    Button
} from '@material-ui/core';
import axios from '../../api';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-dt/js/dataTables.dataTables.min.js';
import 'datatables.net/js/jquery.dataTables';

const columns = [
    { id: 'id', label: 'Protocolo',  width: '5%' },
    { id: 'descricao', label: 'Descrição',  width: '20%' },
    { id: 'sigla', label: 'Sigla',  width: '10%' },
    { id: 'created_at', label: 'Data cadastro',  width: '20%' },
    { id: 'acoes', label: 'Ações',  width: '10%' },
];

function TabelaUnidade() {
    const [results, setTableData ] = useState([]);
    const tableRef = useRef(null);

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
                                <TableCell id={"header"} key={column.id}  style={{ width: column.width }}>{column.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((result) => (
                            <TableRow key={result.id}>
                                <TableCell>{result.id}</TableCell>
                                <TableCell>{result.descricao}</TableCell>
                                <TableCell>{result.sigla}</TableCell>
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

export default TabelaUnidade;
