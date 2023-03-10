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
    { id: 'id', label: 'Código ' },
    { id: 'tipo_deficiencia', label: 'Deficiência' },
    { id: 'acoes', label: 'Ações' },
];

function TabelaDeficiencia() {
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

    const handleDelete = (id) => {
        axios.delete(`/consultorios?id=${id}`)
            .then((response) => {
                // exibe mensagem de sucesso com cor verde
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text:  response.data.message,
                }); console.log(response)

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
        //abre o modal de loading enquanto busca os dados da plataforma
        Swal.fire({
            title: 'Carregando...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        axios.get('/tipodeficiencia')
            .then(response => {
                const results = response.data.data;
                setTableData(results);

                // Verifique se o DataTable já foi inicializado na tabela
                const table = $('#tipodeficiencia').DataTable();
                if ($.fn.DataTable.isDataTable('#tipodeficiencia')) {
                    table.destroy();
                }

                // Inicialize o DataTable aqui
                $(document).ready(function() {
                    $('#tipodeficiencia').DataTable({
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
            })
            .finally(()=>{
                //fecha o modal apos tentar pegar as informações do axios
                Swal.close();
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
                <Table id="tipodeficiencia" ref={tableRef}>
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
                                <TableCell>{result.tipo_deficiencia}</TableCell>
                                <TableCell>
                                    <Button  style={{marginLeft: '5px'}} size="small" onClick={() => handleOpen(result.id)} variant="contained" color="secondary" startIcon={<DeleteIcon />} > Excluir</Button>
                                    {(selectedId === result.id) && <BasicModal open={open} handleClose={handleClose} id={result.id} nome={result.consultorio} onConfirmDelete={() => handleDelete(result.id)} />}
                                    {/*inicio do botão de visualização*/}
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

export default TabelaDeficiencia;
