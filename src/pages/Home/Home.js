import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { HeaderContext } from "../../context/HeaderContext";
import './style.css';

import Button from "../../components/Button";
import Header from "../../components/Header";

export default function Home() {
    const { setHeaderData } = useContext(HeaderContext);

    useEffect(() => {
        setHeaderData({
            title: 'TIC-TAC-TOE',
            subtitle: 'developed by axixe'
        })
    }, [setHeaderData]);

    return (
        <>
            <Header />

            <section className='mode-selection'>
                <h2 className='mode-selection__title'>SELECT A MODE:</h2>

                <div className='mode-selection__btn-wrapper'>
                    <Link to='/singleplayer'>
                        <Button btnName='SINGLEPLAYER' />
                    </Link>
                    <Link to='/multiplayer'>
                        <Button btnName='MULTIPLAYER' />
                    </Link>
                </div>
            </section>
        </>
    )
}