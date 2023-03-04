import React from 'react';
import Sidebar from './Sidebar';
import Main from './Main';
import { Button} from "@material-ui/core";

const Layout = ({ children }) => {
    return (
        <>
            <Sidebar />
            <Main>
                {/*Todo o conteudo que for adicionado Dentro de layout JS sera refletido nas demais paginas do projeto*/}
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ position: "relative", float: "right", fontSize: '10px' }}
                    onClick={() => window.location.href="/"}>
                    Voltar
                </Button>
                <br/>
                {children}
            </Main>
        </>
    );
};

export default Layout;