import React, { useState } from "react";
import InputPassword from '../../components/login/inputPassword';
import InputLogin from '../../components/login/inputLogin';
import Button from '../../components/button/button';
import { useNavigate } from 'react-router-dom';

import './loginStyle.css';

function Login({ setAuthState }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        // Verifique se os campos de email e senha estão preenchidos
        if (!email || !password) {
            setError('Por favor, insira seu email e senha.');
            return;
        }

        // Requisição para o backend
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login: email, password: password }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                const role = data.role;
                // Armazena o token em localStorage (ou sessionStorage)
                localStorage.setItem('token', token);
                console.log(role)
 
                if (role === 'ADMIN') {
                    navigate('/admin');
                } else if (role === 'USER') {
                    navigate('/client');
                } else {
                    setError('Tipo de usuário desconhecido.');
                }
            } else {
                // Falha na autenticação
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            console.error('Erro na autenticação:', error);
            setError('Erro na autenticação. Tente novamente mais tarde.');
        }
    };

    return (
        <div className="loginContainer">
            <div className="login">
                <h1 style={{ fontSize: '35px' }}>Login</h1>
                <InputLogin
                    placeholder="Email"
                    icon="login"
                    alt="User Login Image"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputPassword
                    placeholder="Sua senha"
                    icon="password"
                    alt="Password Login Image"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="error-message">{error}</p>}
                <Button text="Entrar" onClick={handleLogin} />
            </div>
        </div>
    );
}

export default Login;
