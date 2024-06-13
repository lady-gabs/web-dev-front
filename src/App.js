import React from 'react';
// import Login from "./pages/login/login";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/sidebar";
import Home from "./pages/Home/Home";
import Produtos from "./pages/Produtos/Produtos";
import Usuarios from "./pages/Usuarios/Usuarios";
import Estoque from "./pages/Estoque/Estoque";
import { SidebarProvider } from "./components/sidebar/SidebarContext";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className='pageContainer'>
      {/* <Login /> */}
      <SidebarProvider>
        <Header />
        <Sidebar />
      </SidebarProvider>
      <Router>
        <Routes>
          <Route exact path="/" component={Home} />
          <Route path="/usuarios" component={Usuarios} />
          <Route path="/produtos" component={Produtos} />
          <Route path="/estoque" component={Estoque} />
          {/* Adicione mais rotas conforme necessário */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
