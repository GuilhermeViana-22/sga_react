import React from 'react';

const Main = ({ children }) => {
    return (
        <main style={{ marginLeft: '250px', padding: '20px' }}>
            {children}
            <p>Funcionarios</p>
        </main>
    );
};

export default Main;
