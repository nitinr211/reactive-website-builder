import React from "react";

import './Button.css';

import {Link} from 'react-router-dom';


const STYLES = ["btn--primary", "btn--outline","btn--ghost"];

const SIZES=["btn--small","btn--medium","btn--large"];

export const Button=({children,type,onClick,buttonStyle,buttonSize})=>
{
    const CheckButtonStyle= STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]

    const CheckButtonSize= SIZES.includes(buttonSize) ? buttonSize : SIZES[1];

    return(
        <Link to='/sign-up' className='btn-mobile'>
            <button className={'btn $checkburronStyle  $CheckButtonSize'}  onClick={onClick} type={type}>
                         {children}
            </button>
        </Link>
    )
};

