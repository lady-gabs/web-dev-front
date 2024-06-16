import React from "react";
import './inputPasswordStyle.css';
import { ReactComponent as PasswordLogo } from '../../assets/passwordIcon.svg';

function InputPassword({ placeholder, icon, alt, value, onChange }) {
    return (
        <div className="inputContainer">
            <PasswordLogo className="iconContainer" />
            <input
                type={(icon === "password") ? "password" : "text"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                alt={alt}
            />
        </div>
    );
}

export default InputPassword;
