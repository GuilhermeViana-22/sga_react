import React, { useState } from 'react';
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    Button,
} from '@material-ui/core';
import ModalFuncionarios from "./Elements/ModalFuncionarios";
import TabelaFuncionarios from "./Elements/TabelaFuncionarios";

const Main = ({children}) => {

    const [open, setOpen] = useState(false);
    //guarda os estados do formualarios
    const [funcionarios, setFuncionarios] = useState([]);

    //função que lida com a abertura do modal
    const handleOpenModal = () => {
        setOpen(true);
    };

    //função que lida com o fechamento do modal
    const handleCloseModal = () => {
        setOpen(false);
    };



    return (
        <main style={{marginLeft: '250px', padding: '20px'}}>
            {children}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent className={"card-funcionarios"}>
                            <Grid container spacing={3}
                                  style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                <Grid item>
                                    <CardHeader title="Cadastro de funcionários"/>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary" onClick={handleOpenModal}>
                                        <i className="fa-solid fa-plus"></i> Cadastrar funcionário
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <ModalFuncionarios open={open} handleClose={handleCloseModal}/>
            {/*inicio da tabela de funcionarios*/}
            <br />
            <br />
            <TabelaFuncionarios /> {/* adiciona o componente Tabela com a key atualizada */}
        </main>
    );
};

export default Main;
