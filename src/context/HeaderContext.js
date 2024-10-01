import React, { createContext, useState } from 'react';

export const HeaderContext = createContext();

export function HeaderProvider({ children }) {
    const [headerData, setHeaderData] = useState({
        title: 'TIC-TAC-TOE',
        subtitle: 'developed by axixe',
    });

    return (
        <HeaderContext.Provider value={{ headerData, setHeaderData }}>
            {children}
        </HeaderContext.Provider>
    );
}