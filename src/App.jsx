import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Faturamento from './Faturamento';
import Estoque from './Estoque';
import Nav from './Nav';
import Banner from './imagens/bannercrosby.png';
import Login from './Login';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col items-center h-screen">
        <div className="flex items-center justify-center w-full h-32 bg-blue-950">
          <img
            className="max-w-2xl min-h-20 min-w-40 p-10"
            src={Banner}
            alt=""
            srcset=""
          />
        </div>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="faturamento" element={<Faturamento />} />
          <Route path="estoque" element={<Estoque />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default App;
