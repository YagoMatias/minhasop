import { useState, useEffect } from 'react';
import LoadingCircle from './LoadingCircle';
import Nav from './Nav';
import { FaMoneyBillWave, FaChartLine, FaUserFriends } from 'react-icons/fa';

const Home = () => {
  const [dados, setDados] = useState([]);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [loading, setLoading] = useState(false);
  const BaseURL = 'https://apicrosby-fpp9p.ondigitalocean.app/';

  const buscarDados = async () => {
    if (!dataInicio || !dataFim) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${BaseURL}home/?inicio=${dataInicio}&fim=${dataFim}`,
      );
      const data = await res.json();

      const ordenado = [...data].sort((a, b) => b.faturamento - a.faturamento);
      const comRank = ordenado.map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
      setDados(comRank);
    } catch (err) {
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const hoje = new Date();
    hoje.setUTCHours(hoje.getUTCHours() - 3);
    const dataBrasilia = hoje.toISOString().split('T')[0];

    setDataInicio(dataBrasilia);
    setDataFim(dataBrasilia);
  }, []);

  useEffect(() => {
    if (dataInicio && dataFim) {
      buscarDados();
    }
  }, [dataInicio, dataFim]);

  const resumo = dados.length > 0 ? dados[0] : null;

  return (
    <>
      <Nav />
      <div className="p-6 space-y-6">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="border px-3 py-2 rounded-md shadow"
          />
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="border px-3 py-2 rounded-md shadow"
          />
          <button
            onClick={buscarDados}
            className="bg-blue-600 text-white px-5 py-2 rounded-md shadow hover:bg-blue-700 transition"
          >
            Buscar
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center mt-20">
            <LoadingCircle />
          </div>
        ) : (
          resumo && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 mt-10">
              {/* TOTAL DE VENDAS */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
                <FaMoneyBillWave className="text-4xl text-green-500 mb-4" />
                <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                  Faturamento Total
                </h2>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300 mt-2">
                  R$ {resumo.faturamento.toFixed(2)}
                </p>
              </div>

              {/* TICKET MÉDIO */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
                <FaChartLine className="text-4xl text-blue-500 mb-4" />
                <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                  Ticket Médio
                </h2>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 mt-2">
                  R$ {Math.floor(resumo.faturamento / resumo.trasaida)},00
                </p>
              </div>

              {/* PA */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
                <FaUserFriends className="text-4xl text-purple-500 mb-4" />
                <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                  PA
                </h2>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300 mt-2">
                  {Number.parseFloat(
                    (+resumo.pasaida - +resumo.paentrada) / +resumo.trasaida,
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Home;
