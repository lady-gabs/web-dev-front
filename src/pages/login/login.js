import React from "react";
import InputPassword from '../../components/login/inputPassword'
import InputLogin from '../../components/login/inputLogin';
import Button from '../../components/button/button'

import './loginStyle.css';

function Login() {
    return (
        <>

            <div className="loginContainer">
                <div className="login">
                    <h1 style={{ fontSize: '35px' }}>Login</h1>
                    <InputLogin placeholder="Email" icon="login" alt="User Login Image"/>
                    <InputPassword placeholder="Sua senha" icon="password" alt="Password Login Image"/>
                    <Button text="Entrar" />
                </div>
            </div>

        </>        
    )
}

export default Login;