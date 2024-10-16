import React from "react";
import './style.css';

export default function Button({ btnName, click, pageClass }) {
    return (
        <button className={`btn${pageClass !== undefined ? ` btn--${pageClass}` : ''}`} onClick={click}>{btnName}</button>
    )
}