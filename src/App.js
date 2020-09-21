import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import ProtectedRouter from "./Components/Helper/ProtectedRouter";
import Home from "./Components/Home";
import Login from './Components/Login/Login'
import User from "./Components/User/User";
import { UserStorage } from "./UserContext";

const App = () => {
  
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* /* significa que tem sub rotas */}
            <Route path="login/*" element={<Login />} />
            <ProtectedRouter path="conta/*" element={<User />} />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
