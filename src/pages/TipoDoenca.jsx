import React, { useState } from 'react';
import {Grid, Card, CardHeader, CardContent, CardActions, TextField, Button, InputLabel } from '@material-ui/core';
import axios from '../api';
import Swal from 'sweetalert2';


const Main = ({ children }) => {

    const [formValues, setFormValues] = useState({
        doenca: '',
        observacao: '',
        tratamento: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/tipodoencas', formValues);
            console.log(formValues)
            console.log(response)
            // exibe mensagem de sucesso com cor verde
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text:  response.data.message,
            });

        } catch (error) {
            console.log(error); // exibe o erro completo no console
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: error.response.data.error,
            });
        }
    }

    return (
        <main style={{ marginLeft: '250px', padding: '20px' }}>
            {children}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <form onSubmit={handleSubmit}>
                            <CardHeader    title="Cadastro de doenças" />
                            <CardContent className={"formularios"}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <InputLabel style={{padding: '0.5rem'}}>Doença</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="outlined-required"
                                            placeholder="Doença"
                                            variant="outlined"
                                            value={formValues.doenca}
                                            onChange={(event) =>
                                                setFormValues({
                                                    ...formValues,
                                                    doenca: event.target.value,
                                                })
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <InputLabel style={{padding: '0.5rem'}}>Observação</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="outlined-required"
                                            placeholder="Observação"
                                            variant="outlined"
                                            value={formValues.observacao}
                                            onChange={(event) =>
                                                setFormValues({
                                                    ...formValues,
                                                    observacao: event.target.value,
                                                })
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputLabel style={{ padding: "0.5rem" }}>Tratamento</InputLabel>
                                        <TextField
                                            id="outlined-multiline-static"
                                            placeholder="Tratamento"
                                            multiline
                                            minRows={4} // use minRows em vez de rowsMin
                                            fullWidth
                                            variant="outlined"
                                            value={formValues.tratamento}
                                            onChange={(event) =>
                                                setFormValues({
                                                    ...formValues,
                                                    tratamento: event.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                </Grid>

                            </CardContent>
                            <CardActions>
                                <Button style={{ padding: '1rem' }} variant="contained" color="primary" type="submit">
                                    <i className="fa-solid fa-plus"></i> Salvar
                                </Button>
                            </CardActions>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </main>
    );
};

export default Main;