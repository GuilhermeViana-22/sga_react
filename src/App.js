import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Unidade from './pages/Unidade';
import Consultorios from './pages/Consultorios';
import Funcionarios from './pages/Funcionarios';
import Layout from './components/Layout';

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
                        <Route path="/unidades" element={<Unidade />} />
                        <Route path="/consultorios" element={<Consultorios />} />
                        <Route path="/Funcionarios" element={<Funcionarios />} />
                    </Routes>
                </Layout>
            </div>
        </Router>
    );
}

export default App;
