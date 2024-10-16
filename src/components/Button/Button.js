import React from "react";
import './style.css';

export default function Button({ btnName, click, pageClass, disabled }) {
    return (
        <button className={`btn${pageClass !== undefined ? ` btn--${pageClass}` : ''}`} onClick={click} disabled={disabled}>{btnName}</button>
    )
}