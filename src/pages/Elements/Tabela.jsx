import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import axios from '../../api';

const columns = [
    { id: 'id', label: 'Código ' },
    { id: 'Consultório', label: 'Consultório' },
    { id: 'ativo', label: 'Disponível' },
    { id: 'acoes', label: 'Ações' },
];

function Tabela() {
    const [results, setTableData] = useState([]);

    useEffect(() => {
        axios.get('')
            .then(response => {
                const results = response.data.data;
                console.log(results)
                setTableData(results);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
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
                            <TableCell>{ (Number(result.ativo) === 1 ) ? 'Disponível' : 'Não'}</TableCell>
                            <TableCell>{result.acoes}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Tabela;

