import React from 'react';
import Sidebar from './Sidebar';
import Main from './Main';

const Layout = ({ children }) => {
    return (
        <>
            <Sidebar />
            <Main>
                {children}
            </Main>
        </>
    );
};

export default Layout;