import React from 'react';

const Main = ({ children }) => {
    return (
        <main style={{ marginLeft: '30px', padding: '20px' , width: '100%'}}>
            {children}
            <p></p>
        </main>
    );
};

export default Main;
