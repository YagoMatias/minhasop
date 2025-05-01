import { useEffect, useState } from 'react';
import LoadingCircle from './loadingCiecle';

function Faturamento() {
  const [dados, setDados] = useState([]);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [loading, setLoading] = useState(false);
  const BaseURL = 'https://apinode-vhphp.ondigitalocean.app/';

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
      <div className="p-6 space-y-4">
        <div className="flex gap-4 items-center">
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

      {loading ? (
        <div className="flex justify-center items-center mt-20 ">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="block max-[500px]:overflow-x-auto max-[500px]:w-[300px]">
          <table className="text-left text-xs whitespace-nowrap ">
            <thead className="uppercase tracking-wider border-b-2 text-center">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3">
                  Empresa
                </th>
                <th scope="col" className="px-6 py-3">
                  Faturamento
                </th>
                <th scope="col" className="px-6 py-3">
                  PA
                </th>
                <th scope="col" className="px-6 py-3">
                  Ticket Médio
                </th>
              </tr>
            </thead>
            <tbody>
              {dados.map((item) => (
                <tr key={item.cd_grupoempresa} className="border-b-2 ">
                  <th className="px-6 py-3 text-center">
                    {item.faturamento > 0 ? item.rank : null}
                  </th>
                  <td
                    className="px-6 py-3 text-center "
                    title={item.nome_fantasia}
                  >
                    {item.faturamento > 0 ? item.nome_fantasia : null}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {item.faturamento.toFixed(2) > 1
                      ? item.faturamento.toFixed(2)
                      : null}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {item.faturamento > 0
                      ? Number.parseFloat(
                          (+item.pasaida - +item.paentrada) / +item.trasaida,
                        ).toFixed(2)
                      : null}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {item.faturamento > 0
                      ? Math.floor(item.faturamento / item.trasaida)
                      : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Faturamento;
