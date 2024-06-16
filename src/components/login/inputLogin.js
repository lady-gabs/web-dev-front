import React from "react";
import './inputLoginStyle.css';
import { ReactComponent as LoginLogo } from '../../assets/loginIcon.svg';

function InputLogin({ placeholder, icon, alt, value, onChange }) {
    return (
        <div className="inputContainerLogin">
            <LoginLogo className="loginIconContainer" />
            <input
                type={(icon === "login") ? "email" : "text"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                alt={alt}
            />
        </div>
    );
}

export default InputLogin;
