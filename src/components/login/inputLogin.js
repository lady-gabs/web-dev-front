import React from "react";

import './inputLoginStyle.css';

import {ReactComponent as LoginLogo} from '../../assets/loginIcon.svg';

function InputLogin(props) {
    
    return (
        <div className="inputContainerLogin">
             <LoginLogo className="loginIconContainer" />
            <input type={(props.icon === "login") ? "login" : "text"} placeholder={props.placeholder}></input>
        </div>
    )
}


export default InputLogin;