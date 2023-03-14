import React, {useState} from 'react';
import { Grid, Card, CardHeader, CardContent, CardActions, TextField, Button, Switch, InputLabel} from '@material-ui/core';
import axios from '../api';
import Tabela from './Elements/Tabela';
import Swal from 'sweetalert2';
import {withStyles} from '@material-ui/core/styles';
import '../App.css';
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
    //defini os estados dos erros no código
    const [error, setError] = useState(false);

    //adiciona a constante da tabela
    const [tableKey, setTableKey] = useState(0); // add key to table component


    const handleChange = (event) => {
        setChecked(event.target.checked);
        setFormValues({
            ...formValues,
            ativo: event.target.checked ? 1 : 0,
        });
    };


    //realiza a validação de informações
    function validateFields() {
        if (formValues.consultorio === '') {
            return false;
        }

        if (formValues.ativo === '') {

            return false;
        }
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        //verifica se as informações foram preenchidas
        const isValid = validateFields();
        setError(!isValid);

        if (isValid) {
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
                    text: error.response.data.message,
                });
            }
        }
    }


    //essa contante completa refere-se a estilização e utilização de um botao swih
    const IOSSwitch = withStyles((theme) => ({
        root: {
            width: 105,
            height: 54,
            padding: 2,
            top: -5,
            margin: theme.spacing(1),
            transition: 'background-color 2s ease-in-out', // altere o tempo aqui
        },

        switchBase: {
            padding: 10,
            '&$checked': {
                transform: 'translateX(50px)',
                color: theme.palette.common.white,

                '& + $track': {
                    backgroundColor: '#044e86',
                    opacity: 1,
                    border: 'none',
                },
            },
        },
        thumb: {
            width: 35,
            height: 33,
            boxShadow: 'none',
        },
        track: {
            border: `1px solid '#002D51'`,
            borderRadius: 50 / 2,
            backgroundColor: '#C5C5C5',
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
    //essa contante completa refere-se a estilização e utilização de um botao swih


    //inicio do render da pagina
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
                                            inputProps={{maxLength: 50}} // adiciona o atributo maxlength diretamente no input
                                            value={formValues.consultorio}
                                            onChange={(event) =>
                                                setFormValues({
                                                    ...formValues,
                                                    consultorio: event.target.value,
                                                })
                                            }
                                            error={error}
                                            helperText={error ? 'O Consultório deve ser preenchido.' : ''}
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <InputLabel style={{padding: '0.6rem'}}>Ativo</InputLabel>
                                        <IOSSwitch checked={checked} onChange={handleChange} name="checkedB" error={error} helperText={error ? 'Durante o cadastro selecione o consultório como ativo.' : ''}/>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Button  variant="contained" color='primary' type="submit">
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