import React from "react";

import './buttonStyle.css';

function Button(props) {
    return (
        <button>{props.text}</button>
    )
}

export default Button;