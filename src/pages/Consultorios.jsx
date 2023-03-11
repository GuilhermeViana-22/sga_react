import React, {useState} from 'react';
import {
    Grid, Card, CardHeader, CardContent, CardActions, TextField, Button, Switch, InputLabel,
} from '@material-ui/core';
import axios from '../api';
import Tabela from './Elements/Tabela';
import Swal from 'sweetalert2';
import {withStyles} from '@material-ui/core/styles';

const Main = ({children}) => {
    //define o checked do formulario
    const [checked, setChecked] = useState(false);
    // define os valores enviados para o formulario
    const [formValues, setFormValues] = useState({
        consultorio: '',
        //ativo esta setado como true e vai receber 1 no base de dados
        ativo: true,
        //inicialmente o consultorio é cadastrado como disponivel para depois ser alterado quando ficar ocupado
        flag: 'Disponivel',
    });
    //adiciona a constante da tabela
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
                text: response.data.message,
            });

            // refresh table component by updating its key
            setTableKey(tableKey + 1);

        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: error.response.data.error,
            });
        }
    }


    //essa contante completa refere-se a estilização e utilização de um botao swih
    const IOSSwitch = withStyles((theme) => ({
        root: {
            width: 100,
            height: 50,
            padding: 2,
            margin: theme.spacing(1),
            transition: 'background-color 2s ease-in-out', // altere o tempo aqui
        },
        switchBase: {
            padding: 10,
            '&$checked': {
                transform: 'translateX(50px)',
                color: theme.palette.common.white,

                '& + $track': {
                    backgroundColor: theme.palette.common.primary,
                    opacity: 1,
                    border: 'none',
                },
            },
            '&$focusVisible $thumb': {
                color: '#52d869',
                border: '6px solid #fff',
            },
        },
        thumb: {
            width: 30,
            height: 30,
            boxShadow: 'none',
        },
        track: {
            border: `1px solid ${theme.palette.grey[400]}`,
            borderRadius: 50 / 2,
            backgroundColor: theme.palette.grey[50],
            opacity: 1,
            transition: theme.transitions.create(['background-color', 'border']),
        },
        checked: {},
        focusVisible: {},
    }))(({classes, ...props}) => {
        return (
            <Switch
                focusVisibleClassName={classes.focusVisible}
                disableRipple
                classes={{
                    root: classes.root,
                    switchBase: classes.switchBase,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                }}
                {...props}
            />
        );
    });

    return (
        <main style={{marginLeft: '250px', padding: '20px'}}>
            {children}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <form onSubmit={handleSubmit}>
                            <CardHeader title="Cadastro de Consutórios"/>
                            <CardContent className={"formularios"}>
                                <Grid container spacing={3}>
                                    <Grid item xs={5}>
                                        <InputLabel style={{padding: '0.6rem'}}>Consultório</InputLabel>

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
                                    <Grid item xs={5}>
                                        <InputLabel style={{padding: '0.6rem'}}>Ativo</InputLabel>
                                        <IOSSwitch checked={checked} onChange={handleChange} name="checkedB"/>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Button style={{padding: '1rem'}} variant="contained" color='primary' type="submit">
                                    <i className="fa-solid fa-plus"></i> Salvar
                                </Button>
                            </CardActions>
                        </form>
                    </Card>
                </Grid>
            </Grid>
            <br/>
            <br/>
            <Tabela key={tableKey}/> {/* adiciona o componente Tabela com a key atualizada */}
        </main>
    );
};

export default Main;