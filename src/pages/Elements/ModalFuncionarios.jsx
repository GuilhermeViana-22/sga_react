import React, { useState } from 'react';
import { Modal, Grid, TextField, InputLabel, CardHeader, Button } from '@material-ui/core';

const ModalFuncionarios = ({ open, handleClose, saveFuncionario }) => {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        saveFuncionario(formValues);
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '70%', backgroundColor: 'white', padding: '2rem' }}>
                <CardHeader title="Preencha os campos" />
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <InputLabel style={{ padding: '0.5rem' }}>Nome Funcionário</InputLabel>
                            <TextField
                                fullWidth
                                id="outlined-required"
                                placeholder="Nome Funcionário"
                                variant="outlined"
                                value={formValues.name}
                                onChange={(event) =>
                                    setFormValues({
                                        ...formValues,
                                        name: event.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel style={{ padding: '0.5rem' }}>E-mail</InputLabel>
                            <TextField
                                fullWidth
                                id="outlined-required"
                                placeholder="E-mail"
                                variant="outlined"
                                value={formValues.email}
                                onChange={(event) =>
                                    setFormValues({
                                        ...formValues,
                                        email: event.target.value,
                                    })
                                }
                            />
                        </Grid>
                    </Grid>
                    <Button style={{ padding: '1rem', marginTop: '30px' }} variant="contained" color="primary" type="submit">
                        <i className="fa-solid fa-plus"></i> Salvar Funcionário
                    </Button>
                </form>
            </div>
        </Modal>
    );
};

export default ModalFuncionarios;
