import React, { useState } from 'react';
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    Button,
} from '@material-ui/core';
import TriagemModal from "./Elements/TriagemModal";

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
                        <CardContent className={"card-triagem"}>
                            <Grid container spacing={3}
                                  style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                <Grid item>
                                    <CardHeader title="Triagem"/>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="secondary" onClick={handleOpenModal}>
                                        <i className="fa-solid fa-plus"></i> Chamar próxima senha
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <TriagemModal open={open} handleClose={handleCloseModal}/>
        </main>
    );
};

export default Main;
