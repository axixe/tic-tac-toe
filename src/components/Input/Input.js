// import React, { useState } from "react";
// import './style.css';

// export default function Input(props) {
//     const [value, setValue] = useState(''),
//           [isValid, setIsValid] = useState(true),
//           { label, type, minlength, maxlength } = props;

//     const [errors, setErrors] = useState({
//         minlength: { isValid: true, value: minlength },
//         maxlength: { isValid: true, value: maxlength }
//     });

//     function handleChange(e) {
//         const { value } = e.target;

//         setErrors({
//             minlength: { isValid: value.length >= minlength, value: minlength },
//             maxlength: { isValid: value.length <= maxlength, value: maxlength }
//         })

//         setValue(value);
//     }

//     return (
//         <>
//             <div className='input'>
//                 <label className='input__title'>{label ? label.toUpperCase() : 'undefined'}</label>
//                 <input className={`input__element ${!isValid ? 'input__element--warning' : ''}`} type={type} value={value} onChange={handleChange} placeholder={`...type ${label} here`} />
//                 <span className='input__warning'>!</span>
//             </div>

//             <InputError errorsObj={errors} />
//         </>
//     )
// }

// function InputError(props) {
//     const { minlength, maxlength } = props;

//     return (
//         <div className='input-error'>
//             <div className='input-error__title'>There was an issue with our request:</div>
//             <span className='input-error__message'>
//                 <span className='input-error__icon'>✖ </span>
//                 String can contain a maximum of 30 characters
//             </span>
//             <span className='input-error__message'>
//                 <span className='input-error__icon'>✖ </span>
//                 Name can contain a maximum of 30 characters
//             </span>
//             <span className='input-error__message'>
//                 <span className='input-error__icon'>✖ </span>
//                 Name can contain a maximum of 30 characters
//             </span>
//         </div>
//     )
// }