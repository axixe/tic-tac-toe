import React from "react";
import './style.css';

export default function Imput(props) {
    const { label, type } = props;

    return (
        <div className='input'>
            <label className='input__title'>{label.toUpperCase()}</label>
            <input className='input__element' type={type} placeholder={`...type ${label} here`} />
        </div>
    )
}