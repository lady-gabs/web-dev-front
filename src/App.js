import Login from "./pages/login/login";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/sidebar";

import './App.css';

function App() {
  return (
    <div className='pageContainer'>
      {/* <Login /> */}
      <Header/>
      <Sidebar />
    </div>
  );
}

export default App;
