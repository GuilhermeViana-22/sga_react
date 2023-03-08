import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardHeader, CardContent, CardActions, TextField, Button } from '@material-ui/core';

const Main = ({ children }) => {
    //declarando os estados do formulario
    const [formValues, setFormValues] = useState({
        descricao: '',
        bairro: '',
        logradouro: '',
        cep: '',
        numero: '',
        qtd_funcionarios: '',
        codigo_unidade: '',
        sigla: '',
        localidade: '',
        complemento: '',
        ativo: true,
    });
    const [address, setAddress] = useState({});

    //função que pega os dados pelo CEP informado
    function handleCepChange(event) {
        const cep = event.target.value.replace(/[^0-9]/g, ''); // remove caracteres não numéricos
        setFormValues({...formValues, cep: cep}); // atualiza o estado com o CEP digitado
        if (cep.length === 8) { // verifica se o CEP tem 8 dígitos
            axios
                .get(`https://viacep.com.br/ws/${cep}/json/`)
                .then((response) => {
                    console.log( response.data)
                    const { logradouro, bairro, localidade } = response.data;
                    setAddress(response.data); // atualiza o estado com os dados de endereço
                    setFormValues({...formValues, logradouro, bairro,localidade}); // preenche os campos de endereço
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    useEffect(() => {
        setFormValues({
            ...formValues,
            bairro: address.bairro || '',
            logradouro: address.logradouro || '',
        });
    }, [address]);

    return (
        <main style={{ marginLeft: '250px', padding: '20px' }}>
            {children}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Cadastro de Unidades" />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        id="outlined-required"
                                        placeholder="Descrição Unidade"
                                        variant="outlined"
                                        value={formValues.descricao}
                                        onChange={(event) =>
                                            setFormValues({
                                                ...formValues,
                                                descricao: event.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        id="outlined-required"
                                        placeholder="CEP"
                                        variant="outlined"
                                        value={formValues.cep}
                                        onChange={handleCepChange} // chama a função handleCepChange no evento onChange
                                    />

                                </Grid>

                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        id="outlined-required"
                                        placeholder="Logradouro"
                                        variant="outlined"
                                        value={formValues.logradouro}
                                        onChange={(event) =>
                                            setFormValues({
                                                ...formValues,
                                                logradouro: event.target.value,
                                            })
                                        }
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        id="outlined-required"
                                        placeholder="Bairro"
                                        variant="outlined"
                                        value={formValues.bairro}
                                        onChange={(event) =>
                                            setFormValues({
                                                ...formValues,
                                                bairro: event.target.value,
                                            })
                                        }
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        id="outlined-required"
                                        placeholder="localidade"
                                        variant="outlined"
                                        value={formValues.localidade}
                                        onChange={(event) =>
                                            setFormValues({
                                                ...formValues,
                                                localidade: event.target.value,
                                            })
                                        }
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        id="outlined-required"
                                        placeholder="Número"
                                        variant="outlined"
                                        value={formValues.numero}
                                        onChange={(event) =>
                                            setFormValues({
                                                ...formValues,
                                                numero: event.target.value,
                                            })
                                        }
                                    />
                                </Grid>


                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        id="outlined-required"
                                        placeholder="Complemento"
                                        variant="outlined"
                                        value={formValues.complemento}
                                        onChange={(event) =>
                                            setFormValues({
                                                ...formValues,
                                                complemento: event.target.value,
                                            })
                                        }
                                    />
                                </Grid>

                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary">Salvar</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </main>
    );
};

export default Main;
