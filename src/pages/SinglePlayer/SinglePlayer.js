import React, { useContext, useEffect } from "react";
import { HeaderContext } from "../../context/HeaderContext";

import Header from "../../components/Header";

export default function SinglePlayer() {
    const { setHeaderData } = useContext(HeaderContext);

    useEffect(() => {
        setHeaderData({
            title: 'SINGLEPLAYER',
            subtitle: 'YOUR TURN'
        })
    }, [setHeaderData]);

    return (
        <Header />
    )
}