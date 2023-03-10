import React from 'react';
import { NavLink } from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import logo from '../assets/logo.png';
import '../App.css';

const darkmode = 'background: rgb(0,24,52);\n' +
    'background: linear-gradient(152deg, rgba(0,24,52,1) 0%, rgba(0,24,52,1) 35%, rgba(4,55,113,1) 92%, rgba(7,90,185,1) 98%);';
const useStyles = makeStyles((theme) => ({
    root: {
        width: 240,
        height: '100vh',
        backgroundColor: darkmode,
        color: theme.palette.common.white,
        padding: theme.spacing(4),
        position: 'fixed', // adiciona a propriedade de posição fixa
        left: 0, // fixa o componente na esquerda
    },
    menu: {
        marginTop: theme.spacing(2),

    },
    content: {
        marginLeft: 240, // adiciona uma margem à esquerda para acomodar o sidebar
        padding: theme.spacing(2),
    },
    logo: {
        width: '100%',
        maxWidth: '100%',
        height: 'auto',
        marginBottom: theme.spacing(2),
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.common.white,
    },
    config: {
        position: 'fixed',
        bottom: 20,

    },
}));


function Sidebar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img src={logo} alt="Menu" className={classes.logo}/>
            <ul className={classes.menu}>
                <li>
                    <NavLink to="/" className={classes.link}>
                        <i className="fa fa-house"></i> Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/triagem" className={classes.link}>
                        <i className="fas fa-file"></i> Triagem
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/unidades" className={classes.link} >
                        <i className="fa fa-hospital"></i> Unidades
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/deficiencia" className={classes.link} >
                        <i className="fas fa-wheelchair"></i>  Deficiência
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/doenca" className={classes.link} >
                        <i className="fas fa-notes-medical"></i>  Doenças
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/funcionarios" className={classes.link} >
                        <i className="fa fa-user-md" aria-hidden="true"></i> Funcionarios
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/pacientes" className={classes.link} >
                        <i className="fa fa-user" aria-hidden="true"></i> Pacientes
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/consultorios" className={classes.link}>
                        <i className="fa-solid fa-mobile"></i> Consultórios
                    </NavLink>
                </li>
            </ul>
            <li className={classes.config}>
                <NavLink to="/configuracoes" className={classes.link}>
                    <i className="fas fa-cog"></i> Configurações
                </NavLink>
            </li>
        </div>
    );
}

export default Sidebar;