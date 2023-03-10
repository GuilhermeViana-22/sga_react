import React, {useState, useEffect, useRef} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CardContent} from '@material-ui/core';
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
    {id: 'id', label: 'Código ',  width: '5%'},
    {id: 'Consultório', label: 'Consultório',  width: '5%'},
    {id: 'ativo', label: 'Disponível',  width: '5%'},
    {id: 'acoes', label: 'Ações',  width: '5%'},
];

function Tabela() {
    const [results, setTableData] = useState([]);

    //atualiza a tabeça

    const [updated, setUpdated] = useState(false);
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

    const handleDelete = (id) => {
        axios.delete(`/consultorios?id=${id}`)
            .then((response) => {
                // exibe mensagem de sucesso com cor verde
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: response.data.message,
                });

                // Atualiza o estado de atualização da tabela
                setUpdated(!updated);

                // Atualiza o estado da tabela removendo o item excluído
                setTableData(prevResults => prevResults.filter(result => result.id !== id));

            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: error.response.data.error,
                });
            });
    };

    useEffect(() => {

        Swal.fire({
            title: 'Carregando...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        axios.get('/consultorios')
            .then(response => {
                const results = response.data.data;
                setTableData(results);

                // Verifique se o DataTable já foi inicializado na tabela
                const table = $('#consultorios').DataTable();
                if ($.fn.DataTable.isDataTable('#consultorios')) {
                    table.destroy();
                }

                // Inicialize o DataTable aqui
                $(document).ready(function () {
                    $('#consultorios').DataTable({
                        language: {
                            url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Portuguese-Brasil.json'
                        },
                        deferRender: true,
                        destroy: true, // adicione essa opção
                        autoWidth: false,
                        columnDefs: [
                            {
                                targets: ['_all'],
                                className: 'mdc-data-table__cell',
                            },
                        ],
                    });
                });
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                Swal.close();
            });
    }, []);

    useEffect(() => {
        if (tableRef.current) {
            $(tableRef.current).DataTable();
        }
    }, [results]);

    return (

        <TableContainer component={Paper}>
            <CardContent>
                <Table id="consultorios" className={'table is-striped'} ref={tableRef}>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell id={"header"}  style={{ width: column.width }} key={column.id}>{column.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((result) => (
                            <TableRow key={result.id}>
                                <TableCell>{result.id}</TableCell>
                                <TableCell>{result.consultorio}</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>
                                    {(Number(result.ativo) === 1) ?
                                        <i className="fas fa-door-open" style={{ color: 'green', fontSize: '25pt' }}></i> :
                                        <i className="fas fa-door-closed" style={{ color: 'red', fontSize: '25pt' }}></i>
                                    }
                                </TableCell>
                                <TableCell>
                                    {/*botao de realizar edições*/}
                                    <Button style={{marginLeft: '5px', backgroundColor: '#5bc0de', color: '#fff'}} size="small" variant="contained"  type="submit" className="bg-yellow-500">
                                        <i className="fa-solid fa-pencil"></i> Editar
                                    </Button>
                                    {/*inicio do botao de visualização*/}
                                    <Button style={{marginLeft: '5px'}} size="small" variant="contained" color="primary" type="submit">
                                        <i className="fa-solid fa-eye"></i> Visualizar
                                    </Button>
                                    {/*inicio do botao de exclusão*/}
                                    <Button style={{marginLeft: '5px'}} size="small"
                                            onClick={() => handleOpen(result.id)} variant="contained" color="secondary"
                                            startIcon={<DeleteIcon/>}> Excluir</Button>
                                    {(selectedId === result.id) &&
                                        <BasicModal open={open} setUpdated={(!updated)} handleClose={handleClose} id={result.id}
                                                    nome={result.consultorio}
                                                    onConfirmDelete={() => handleDelete(result.id)}/>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </CardContent>
        </TableContainer>

    );
}

export default Tabela;
