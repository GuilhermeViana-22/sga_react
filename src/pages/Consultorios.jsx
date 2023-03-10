import React, { useState } from 'react';
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    TextField,
    Button,
    Switch,
    FormControlLabel, InputLabel,
} from '@material-ui/core';
import axios from '../api';
import Tabela from './Elements/Tabela';
import Swal from 'sweetalert2';
import theme from '../customs/createMuiTheme ';

const Main = ({ children }) => {
    const [checked, setChecked] = useState(false);
    const [formValues, setFormValues] = useState({
        consultorio: '',
        ativo: true,
        flag: 'Disponivel',
    });
    const [tableKey, setTableKey] = useState(0); // add key to table component

    const handleChange = (event) => {
        setChecked(event.target.checked);
        setFormValues({
            ...formValues,
            ativo: event.target.checked ? 1 : 0,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/consultorios', {
                consultorio: formValues.consultorio,
                ativo: parseInt(formValues.ativo),
            });

            // exibe mensagem de sucesso com cor verde
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text:  response.data.message,
            });

            // refresh table component by updating its key
            setTableKey(tableKey + 1);

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
                            <CardHeader    title="Cadastro de Consutórios" />
                            <CardContent className={"formularios"}>
                                <Grid container spacing={3}>
                                    <Grid item xs={5}>
                                        <InputLabel style={{padding: '0.5rem'}}>Consultório</InputLabel>

                                        <TextField
                                            fullWidth
                                            id="outlined-required"
                                            placeholder="Consultório"
                                            variant="outlined"
                                            value={formValues.consultorio}
                                            onChange={(event) =>
                                                setFormValues({
                                                    ...formValues,
                                                    consultorio: event.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <br />
                                <br />
                                <Grid item xs={4}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={checked}
                                                onChange={handleChange}
                                                name="mySwitch"
                                                color="primary"
                                            />
                                        }
                                        label="Ativo"
                                    />
                                </Grid>
                            </CardContent>
                        <CardActions>
                            <Button style={{ padding: '1rem' }} variant="contained"  color='primary' type="submit">
                                <i className="fa-solid fa-plus"></i> Salvar
                            </Button>
                        </CardActions>
                        </form>
                    </Card>
                </Grid>
            </Grid>
            <br />
            <br />
            <Tabela key={tableKey} /> {/* adiciona o componente Tabela com a key atualizada */}
        </main>
    );
};

export default Main;