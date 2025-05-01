import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Faturamento from './Faturamento';
import Estoque from './Estoque';
import Nav from './Nav';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col items-center bg-gray-50 h-full">
        <div className="flex items-center justify-center w-full h-32 bg-blue-950">
          <img
            className="max-w-2xl min-h-20 min-w-40 p-10"
            src="src/imagens/crosby_pontovermelho.png"
            alt=""
            srcset=""
          />
        </div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="faturamento" element={<Faturamento />} />
          <Route path="estoque" element={<Estoque />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default App;
