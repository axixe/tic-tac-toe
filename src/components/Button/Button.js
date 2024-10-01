import React from "react";
import './style.css';

export default function Button(props) {
    return (
        <button className='btn'>{props.btnName}</button>
    )
}