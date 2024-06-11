// import Login from "./pages/login/login";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/sidebar";
import Produtos from "./pages/Produtos/Produtos";

import './App.css';


function App() {
  return (
    <div className='pageContainer'>
      {/* <Login /> */}
      <Header/>
      <Sidebar />
      <Produtos/>
    </div>
  );
}

export default App;
