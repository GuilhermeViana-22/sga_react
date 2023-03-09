import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Grid, Card, CardHeader, CardContent, CardActions, TextField, Button, InputLabel} from '@material-ui/core';
import Swal from "sweetalert2";

const Main = ({children}) => {
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
        ativo: 1,
    });
    const [address, setAddress] = useState({});
    //defini os estados dos erros no código
    const [error, setError] = useState(false);

    //função que pega os dados pelo CEP informado
    function handleCepChange(event) {
        const cep = event.target.value.replace(/[^0-9]/g, ''); // remove caracteres não numéricos
        setFormValues({...formValues, cep: cep}); // atualiza o estado com o CEP digitado
        if (cep.length === 8) { // verifica se o CEP tem 8 dígitos
            axios
                .get(`https://viacep.com.br/ws/${cep}/json/`)
                .then((response) => {
                    console.log(response.data)
                    const {logradouro, bairro, localidade} = response.data;
                    setAddress(response.data); // atualiza o estado com os dados de endereço
                    setFormValues({...formValues, logradouro, bairro, localidade}); // preenche os campos de endereço
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


    function validateFields() {
        if (formValues.descricao === '') {
            return false;
        }
        if (formValues.bairro === '') {
            return false;
        }
        if (formValues.cep === '') {
            return false;
        }
        if (formValues.numero === '') {
            return false;
        }
        if (formValues.qtd_funcionarios === '') {
            return false;
        }
        if (formValues.codigo_unidade === '') {
            return false;
        }
        if (formValues.sigla === '') {
            return false;
        }
        if (formValues.localidade === '') {
            return false;
        }
        if (formValues.complemento === '') {
            return false;
        }
        return true;
    }

    //método para realizar a adição de uma nova unidade no banco de dados
    const handleSubmit = async (event) => {
        event.preventDefault();

        const isValid = validateFields();
        setError(!isValid);

        if (isValid) {
            try {
                const response = await axios.post('http://localhost:8000/api/unidade', formValues);
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: response.data.message,
                });
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: error.response.data.error,
                });
            }
        }
    }

    return (
        <main style={{marginLeft: '250px', padding: '20px'}}>
            {children}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <form onSubmit={handleSubmit}>
                            <CardHeader title="Cadastro de Unidades"/>
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={7}>
                                        <InputLabel style={{padding: '0.5rem'}}>Descrição unidade</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="outlined-required"
                                            variant="outlined"
                                            placeholder="Descrição unidade"
                                            value={formValues.descricao}
                                            onChange={(event) =>
                                                setFormValues({
                                                    ...formValues,
                                                    descricao: event.target.value,
                                                })
                                            }
                                            error={error}
                                            helperText={error ? 'A descrição da unidade deve ser preenchida.' : ''}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <InputLabel style={{padding: '0.5rem'}}>Sigla</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="outlined-required"
                                            variant="outlined"
                                            placeholder="Sigla"
                                            value={formValues.sigla}
                                            onChange={(event) =>
                                                setFormValues({
                                                    ...formValues,
                                                    sigla: event.target.value,
                                                })
                                            }
                                            error={error}
                                            helperText={error ? 'A Sigla da unidade deve ser preenchida.' : ''}

                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputLabel style={{padding: '0.5rem'}}>Código Unidade</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="outlined-required"
                                            variant="outlined"
                                            placeholder="Código Unidade"
                                            value={formValues.codigo_unidade}
                                            onChange={(event) =>
                                                setFormValues({
                                                    ...formValues,
                                                    codigo_unidade: event.target.value,
                                                })
                                            }
                                            error={error}
                                            helperText={error ? 'O Código Unidades da unidade deve ser preenchido.' : ''}

                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputLabel style={{padding: '0.5rem'}}>CEP</InputLabel>

                                        <TextField
                                            fullWidth
                                            id="outlined-required"
                                            placeholder="CEP"
                                            variant="outlined"
                                            value={formValues.cep}
                                            onChange={handleCepChange} // chama a função handleCepChange no evento onChange
                                            error={error}
                                            helperText={error ? 'O CEP da unidade deve ser preenchido.' : ''}
                                        />
                                    </Grid>

                                    <Grid item xs={5}>
                                        <InputLabel style={{padding: '0.5rem'}}>Logradouro</InputLabel>

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
                                            error={error}
                                            helperText={error ? 'O Logradouro da unidade deve ser preenchido.' : ''}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputLabel style={{padding: '0.5rem'}}>Bairro</InputLabel>

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
                                            error={error}
                                            helperText={error ? 'O Bairro da unidade deve ser preenchido.' : ''}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputLabel style={{padding: '0.5rem'}}>Cidade</InputLabel>

                                        <TextField
                                            fullWidth
                                            id="outlined-required"
                                            placeholder="Cidade"
                                            variant="outlined"
                                            value={formValues.localidade}
                                            onChange={(event) =>
                                                setFormValues({
                                                    ...formValues,
                                                    localidade: event.target.value,
                                                })
                                            }
                                            error={error}
                                            helperText={error ? 'A Cidade da unidade deve ser preenchida.' : ''}
                                        />
                                    </Grid>

                                    <Grid item xs={1}>
                                        <InputLabel style={{padding: '0.5rem'}}>Número</InputLabel>

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
                                            error={error}
                                            helperText={error ? 'O Número da unidade deve ser preenchido.' : ''}
                                        />
                                    </Grid>


                                    <Grid item xs={2}>
                                        <InputLabel style={{padding: '0.5rem'}}>Complemento</InputLabel>

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
                                            error={error}
                                            helperText={error ? 'O Complemento da unidade deve ser preenchido.' : ''}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <InputLabel style={{padding: '0.5rem'}}>Quantidade Funcionarios</InputLabel>

                                        <TextField
                                            fullWidth
                                            id="outlined-required"
                                            placeholder="Quantidade Funcionarios"
                                            variant="outlined"
                                            value={formValues.qtd_funcionarios}
                                            onChange={(event) =>
                                                setFormValues({
                                                    ...formValues,
                                                    qtd_funcionarios: event.target.value,
                                                })
                                            }
                                            error={error}
                                            helperText={error ? 'A Quantidade Funcionarios da unidade deve ser preenchida.' : ''}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Button style={{padding: '0.7rem'}} variant="contained" color="primary" type="submit">
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
