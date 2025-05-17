import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingCiecle from './LoadingCircle';

const Login = () => {
  const BaseURL = 'https://apicrosby-fpp9p.ondigitalocean.app/login';
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false); // Corrigido
  const navigate = useNavigate();

  const HandleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Inicia o loading

    try {
      const response = await axios.post(
        BaseURL,
        JSON.stringify({ tokenid: Number(token) }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      localStorage.setItem('auth', 'true');
      navigate('/home');
    } catch (error) {
      console.error('Erro ao logar:', error);
      alert('Token inválido.');
    } finally {
      setLoading(false); // Finaliza o loading (caso dê erro ou não)
    }
  };

  return (
    <>
      {loading ? (
        <LoadingCiecle />
      ) : (
        <section className="bg-gray-50 dark:bg-gray-900 w-full h-screen">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mt-40">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Entre com o Token
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={HandleLogin}>
                  <div>
                    <label
                      htmlFor="token"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Token
                    </label>
                    <input
                      type="password"
                      name="token"
                      id="token"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="*****"
                      required
                      onChange={(e) => setToken(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Entrar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
