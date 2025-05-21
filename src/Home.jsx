import { useState, useEffect } from 'react';
import LoadingCircle from './LoadingCircle';
import Nav from './Nav';
import { FaMoneyBillWave, FaChartLine, FaUserFriends } from 'react-icons/fa';

const Home = () => {
  const [dados, setDados] = useState([]);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('todas');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [loading, setLoading] = useState(false);
  const BaseURL = 'https://apicrosby-fpp9p.ondigitalocean.app/';

  const buscarDados = async (inicio, fim) => {
    if (!inicio || !fim) return;

    setLoading(true);
    try {
      const res = await fetch(`${BaseURL}/?inicio=${inicio}&fim=${fim}`);
      const data = await res.json();

      const ordenado = [...data].sort((a, b) => b.faturamento - a.faturamento);
      const comRank = ordenado.map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
      setDados(comRank);

      // Se a seleção atual não existe mais, reseta para 'todas'
      if (
        empresaSelecionada !== 'todas' &&
        !comRank.find((d) => d.rank === Number(empresaSelecionada))
      ) {
        setEmpresaSelecionada('todas');
      }
      // Senão mantém a seleção
    } catch (err) {
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  // Data inicial padrão = hoje -3h
  useEffect(() => {
    const hoje = new Date();
    hoje.setUTCHours(hoje.getUTCHours() - 3);
    const dataBrasilia = hoje.toISOString().split('T')[0];
    setDataInicio(dataBrasilia);
    setDataFim(dataBrasilia);
  }, []);

  // Busca dados automaticamente sempre que dataInicio ou dataFim mudar
  useEffect(() => {
    if (dataInicio && dataFim) {
      buscarDados(dataInicio, dataFim);
    }
  }, [dataInicio, dataFim]);

  const dadosTotais = dados.reduce(
    (acc, cur) => {
      acc.faturamento += Number(cur.faturamento) || 0;
      acc.paentrada += Number(cur.paentrada) || 0;
      acc.pasaida += Number(cur.pasaida) || 0;
      acc.trasaida += Number(cur.trasaida) || 0;
      return acc;
    },
    { faturamento: 0, paentrada: 0, pasaida: 0, trasaida: 0 }
  );

  const dadosExibir =
    empresaSelecionada === 'todas'
      ? dadosTotais
      : dados.find((d) => d.rank === Number(empresaSelecionada));

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
          <div className="flex justify-center">
              <select
                value={empresaSelecionada}
                onChange={(e) => setEmpresaSelecionada(e.target.value)}
                className="border px-3 py-2 rounded-md shadow max-w-xs"
              >
                <option value="todas">ESCOLHA UMA LOJA</option>
                {dados.map((item) => (
                  <option key={item.rank} value={item.rank}>
                    {item.nome_fantasia || item.nome || `Empresa ${item.rank}`}
                  </option>
                ))}
              </select>
            </div>
          {/* Se quiser, pode manter o botão, mas não obrigatório */}
          {/* <button onClick={() => buscarDados(dataInicio, dataFim)} ...>Buscar</button> */}
        </div>

        {loading ? (
          <div className="flex justify-center mt-20">
            <LoadingCircle />
          </div>
        ) : dados.length > 0 ? (
          <>
            {dadosExibir && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 mt-10">
                {/* Faturamento */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
                  <FaMoneyBillWave className="text-4xl text-green-500 mb-4" />
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                    Faturamento Total
                  </h2>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300 mt-2">
                    {dadosExibir.faturamento.toLocaleString
                      ? dadosExibir.faturamento.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })
                      : dadosExibir.faturamento}
                  </p>
                </div>

                {/* Ticket Médio */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
                  <FaChartLine className="text-4xl text-blue-500 mb-4" />
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                    Ticket Médio
                  </h2>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 mt-2">
                    R${' '}
                    {dadosExibir.trasaida > 0
                      ? Math.floor(dadosExibir.faturamento / dadosExibir.trasaida)
                      : 0}
                    ,00
                  </p>
                </div>

                {/* PA */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
                  <FaUserFriends className="text-4xl text-purple-500 mb-4" />
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                    PA
                  </h2>
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-300 mt-2">
                    {dadosExibir.trasaida > 0
                      ? (
                          (Number(dadosExibir.pasaida) -
                            Number(dadosExibir.paentrada)) /
                          Number(dadosExibir.trasaida)
                        ).toFixed(2)
                      : '0.00'}
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-center mt-10">Nenhum dado disponível.</p>
        )}
      </div>
    </>
  );
};

export default Home;
