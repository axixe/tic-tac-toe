import React, { useContext } from "react";
import { HeaderContext } from "../../context/HeaderContext";
import './style.css';

export default function Header() {
    const { headerData } = useContext(HeaderContext);
    const { title, subtitle } = headerData;

    return (
        <header className='header'>
            <h1 className='header__title'>{title}</h1>
            <small className='header__subtitle'>{subtitle}</small>
        </header>
    )
}