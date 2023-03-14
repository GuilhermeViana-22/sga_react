import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
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

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Layout><Home /></Layout>} />
                    <Route path="/triagem" element={<Layout><Triagem /></Layout>} />
                    <Route path="/unidades" element={<Layout><Unidade /></Layout>} />
                    <Route path="/consultorios" element={<Layout><Consultorios /></Layout>} />
                    <Route path="/funcionarios" element={<Layout><Funcionarios /></Layout>} />
                    <Route path="/pacientes" element={<Layout><Pacientes /></Layout>} />
                    <Route path="/deficiencia" element={<Layout><TipoDeficiencia /></Layout>} />
                    <Route path="/doenca" element={<Layout><TipoDoenca /></Layout>} />
                    <Route path="/configuracoes" element={<Layout><Configuracoes /></Layout>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
