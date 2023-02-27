import React from 'react';
import { NavLink } from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import logo from '../assets/logo.png';
import '../App.css';

const darkmode = '#001834';
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
}));


function Sidebar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img src={logo} alt="Menu" className={classes.logo}/>
            <ul className={classes.menu}>
                <li>
                    <NavLink to="/" className={classes.link} activeClassName={classes.active}>
                        <i className="fa fa-house"></i> Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/unidades" className={classes.link} activeClassName={classes.active}>
                        <i className="fa fa-hospital"></i> Unidades
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/funcionarios" className={classes.link} activeClassName={classes.active}>
                        <i className="fa fa-user-md" aria-hidden="true"></i> Funcionarios
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/consultorios" className={classes.link} activeClassName={classes.active}>
                        <i className="fa-solid fa-mobile"></i> Consultórios
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;