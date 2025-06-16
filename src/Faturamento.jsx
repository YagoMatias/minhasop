import { useEffect, useState } from 'react';
import LoadingCircle from './LoadingCircle';
import Nav from './Nav';

function Faturamento() {
  const [dados, setDados] = useState([]);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [tipoLoja, setTipoLoja] = useState('Todos'); // Filtro adicionado
  const [loading, setLoading] = useState(false);
  const BaseURL = 'http://localhost:3000/';

  const buscarDados = async () => {
    if (!dataInicio || !dataFim) return;

    setLoading(true);
    try {
      const res = await fetch(`${BaseURL}?inicio=${dataInicio}&fim=${dataFim}`);
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
    hoje.setUTCHours(hoje.getUTCHours() - 3); // Brasília
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
          <select
            value={tipoLoja}
            onChange={(e) => setTipoLoja(e.target.value)}
            className="border px-4 py-2 rounded shadow-sm"
          >
            <option value="Todos">TODAS</option>
            <option value="Franquias">FRANQUIAS</option>
            <option value="Proprias">PRÓPRIAS</option>
          </select>
          <button
            onClick={buscarDados}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded font-semibold shadow-md"
          >
            Buscar
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center mt-10">
            <LoadingCircle />
          </div>
        ) : (
          <div className="block max-[500px]:overflow-x-auto max-[500px]:w-[350px]">
            <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-gray-900 text-white text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 text-center text-xs">#</th>
                  <th className="px-4 py-3 text-left text-xs">Empresa</th>
                  <th className="px-4 py-3 text-center text-xs">Faturamento (R$)</th>
                  <th className="px-4 py-3 text-center text-xs">PA</th>
                  <th className="px-4 py-3 text-center text-xs">Ticket Médio</th>
                </tr>
              </thead>
              <tbody>
                {dados
                  .filter((item) => {
                    if (tipoLoja === 'Franquias') return item.nome_fantasia?.startsWith('F');
                    if (tipoLoja === 'Proprias') return !item.nome_fantasia?.startsWith('F');
                    return true;
                  })
                  .map((item) =>
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
                          title={item.nome_fantasia}
                        >
                          {item.nome_fantasia}
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
        )}
      </div>
    </>
  );
}

export default Faturamento;
