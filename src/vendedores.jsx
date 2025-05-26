import { useEffect, useState } from 'react';
import Nav from './Nav';

const Vendedores = () => {
  const [dados, setDados] = useState([]);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [loading, setLoading] = useState(true);

  const BaseURL = 'https://apicrosby-fpp9p.ondigitalocean.app/';

  const buscarDados = async (inicio = dataInicio, fim = dataFim) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BaseURL}vendedor/?inicio=${inicio}&fim=${fim}`,
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
    hoje.setHours(hoje.getHours() - 3);
    const dataBrasilia = hoje.toISOString().split('T')[0];
    setDataInicio(dataBrasilia);
    setDataFim(dataBrasilia);
    buscarDados(dataBrasilia, dataBrasilia);
  }, []);

  return (
    <>
      <Nav />
      <div className="p-6 space-y-6">
        {/* Filtros */}
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="border px-4 py-2 rounded shadow-sm"
          />
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="border px-4 py-2 rounded shadow-sm"
          />
          <button
            onClick={() => buscarDados()}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded font-semibold shadow-md"
          >
            Buscar
          </button>
        </div>

        {/* Tabela ou Loading */}
        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="block max-[500px]:overflow-x-auto max-[500px]:w-[350px]">
            <div className="min-w-[700px]">
              <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-gray-900 text-white text-sm uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 text-center text-sm">#</th>
                    <th className="px-4 py-3 text-left text-sm">Vendedor</th>
                    <th className="px-4 py-3 text-center text-sm">
                      Faturamento (R$)
                    </th>
                    <th className="px-4 py-3 text-center text-sm">PA</th>
                    <th className="px-4 py-3 text-center text-sm">
                      Ticket Médio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((item) =>
                    item.faturamento > 0 ? (
                      <tr
                        key={item.cd_grupoempresa}
                        className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 text-sm border-b"
                      >
                        <td className="px-4 py-3 text-center font-bold text-blue-700 text-xs">
                          {item.rank}
                        </td>
                        <td
                          className="px-4 py-3 font-medium text-xs"
                          title={item.nome_vendedor}
                        >
                          {item.nome_vendedor}
                        </td>
                        <td className="px-4 py-3 text-center font-semibold text-green-600 text-xs">
                          {item.faturamento.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </td>
                        <td className="px-4 py-3 text-center text-xs">
                          {Number.parseFloat(
                            (+item.pasaida - +item.paentrada) / +item.trasaida,
                          ).toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-center text-xs">
                          R${' '}
                          {Math.floor(item.faturamento / item.trasaida)
                            .toFixed(2)
                            .replace('.', ',')}
                        </td>
                      </tr>
                    ) : null,
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Vendedores;