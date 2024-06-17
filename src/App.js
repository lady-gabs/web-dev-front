import React, { useState } from 'react';
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/sidebar";
import Home from "./pages/Home/Home";
import Produtos from "./pages/Produtos/Produtos";
import Usuarios from "./pages/Usuarios/Usuarios";
import Estoque from "./pages/Estoque/Estoque";
import Login from "./pages/login/login";
import { SidebarProvider } from "./components/sidebar/SidebarContext";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';

function App() {
  const [authState, setAuthState] = useState({ isAuthenticated: false, userType: null });

  return (
    <SidebarProvider>
      <Router>
        <div className='pageContainer'>
          <Routes>
            <Route path="/login" element={<Login setAuthState={setAuthState} />} />
            <Route path="/" element={authState.isAuthenticated ? <Navigate replace to={`/${authState.userType}`} /> : <Navigate replace to="/login" />} />
            <Route path="/admin/*" element={authState.isAuthenticated && authState.userType === 'ADMIN' ? <MainApp /> : <Navigate replace to="/login" />} />
            <Route path="/client/*" element={authState.isAuthenticated && authState.userType === 'USER' ? <ClientApp /> : <Navigate replace to="/login" />} />
          </Routes>
        </div>
      </Router>
    </SidebarProvider>
  );
}

function MainApp() {
  return (
    <>
      <Header />
      <Sidebar />
      <div className='content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="estoque" element={<Estoque />} />
          {/* Adicione mais rotas conforme necessário */}
        </Routes>
      </div>
    </>
  );
}

function ClientApp() {
  return (
    <>
      <Header />
      <Sidebar client />
      <div className='content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="produtos" element={<Produtos />} />
          {/* Adicione mais rotas conforme necessário */}
        </Routes>
      </div>
    </>
  );
}

export default App;
