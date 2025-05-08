import { useState, useEffect } from 'react';
import LoadingCircle from './loadingCiecle';

const Home = () => {
  const [dados, setDados] = useState([]);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [loading, setLoading] = useState(false);
  const BaseURL = 'https://apicrosby-fpp9p.ondigitalocean.app/';

  const buscarDados = async () => {
    if (!dataInicio || !dataFim) return;

    setLoading(true); // ativa loading
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
      setLoading(false); // desativa loading
    }
  };

  useEffect(() => {
    const hoje = new Date();
    hoje.setUTCHours(hoje.getUTCHours() - 3); // UTC-3 para Brasília
    const dataBrasilia = hoje.toISOString().split('T')[0];

    setDataInicio(dataBrasilia);
    setDataFim(dataBrasilia);
  }, []);

  useEffect(() => {
    if (dataInicio && dataFim) {
      buscarDados();
    }
  }, [dataInicio, dataFim]);

  return (
    <>
      <div className="p-6 space-y-2">
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="border px-2 py-1"
          />
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="border px-2 py-1"
          />
          <button
            onClick={buscarDados}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <LoadingCircle />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-wrap gap-5 px-3 mt-10 justify-center">
            {/* TOTAL DE VENDAS */}
            <div className="border-4 w-60 h-60 flex flex-col gap-12 pt-10 items-center">
              <h2>TOTAL DE VENDAS</h2>
              <div>
                {dados.map((item, index) => (
                  <h3 key={index}>R$ {item.faturamento.toFixed(2)}</h3>
                ))}
              </div>
            </div>

            {/* Ticket Médio */}
            <div className="border-4 w-60 h-60 flex flex-col gap-12 pt-10 items-center">
              <h2>Ticket Médio</h2>
              <div>
                {dados.map((item, index) => (
                  <h3 key={index}>
                    R$ {Math.floor(item.faturamento / item.trasaida)},00
                  </h3>
                ))}
              </div>
            </div>

            {/* PA */}
            <div className="border-4 w-60 h-60 flex flex-col gap-12 pt-10 items-center">
              <h2>PA</h2>
              <div>
                {dados.map((item, index) => (
                  <h3 key={index}>
                    {Number.parseFloat(
                      (+item.pasaida - +item.paentrada) / +item.trasaida,
                    ).toFixed(2)}
                  </h3>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
