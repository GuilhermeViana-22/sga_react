import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Home from './pages/Home';
import Triagem from './pages/Triagem';
import Unidade from './pages/Unidade';
import Consultorios from './pages/Consultorios';
import Funcionarios from './pages/Funcionarios';
import Pacientes from './pages/Pacientes';
import Layout from './components/Layout';
import TipoDeficiencia from "./pages/TipoDeficiencia";
import TipoDoenca from "./pages/TipoDoenca";
import Configuracoes from "./pages/Configuracoes";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function App() {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/triagem" element={<Triagem />} />
                        <Route path="/unidades" element={<Unidade />} />
                        <Route path="/consultorios" element={<Consultorios />} />
                        <Route path="/Funcionarios" element={<Funcionarios />} />
                        <Route path="/Pacientes" element={<Pacientes   />} />

                        <Route path="/deficiencia" element={<TipoDeficiencia   />} />
                        <Route path="/doenca" element={<TipoDoenca   />} />
                        <Route path="/configuracoes" element={<Configuracoes   />} />
                    </Routes>
                </Layout>
            </div>
        </Router>
    );
}

export default App;
