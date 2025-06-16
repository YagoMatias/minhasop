import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Faturamento from './Faturamento';
import Vendedores from './vendedores';
import Banner from './imagens/bannercrosby.png';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Posestoque from './Posestoque';
import Estoque from './estoque';
import Curvaabc from './curvaabc';

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
          <Route
            path="home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="faturamento"
            element={
              <ProtectedRoute>
                <Faturamento />
              </ProtectedRoute>
            }
          />
          <Route
            path="vendedores"
            element={
              <ProtectedRoute>
                <Vendedores />
              </ProtectedRoute>
            }
          />
          <Route
            path="estoque"
            element={
              <ProtectedRoute>
                <Estoque/>
              </ProtectedRoute>
            }
          />
          <Route
            path="posestoque"
            element={
              <ProtectedRoute>
                <Posestoque />
              </ProtectedRoute>
            }
          />
          <Route
            path="curvaabc"
            element={
              <ProtectedRoute>
                <Curvaabc/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default App;
