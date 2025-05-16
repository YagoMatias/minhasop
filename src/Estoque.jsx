import { useEffect, useState } from 'react';
import Nav from './Nav';

const Estoque = () => {
  const [dados, setDados] = useState([]);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [loading, setLoading] = useState(true);

  const BaseURL = 'https://apicrosby-fpp9p.ondigitalocean.app/';

  const buscarDados = async (inicio = dataInicio, fim = dataFim) => {
    setLoading(true);
    fetch(`${BaseURL}vendedor/?inicio=${inicio}&fim=${fim}`)
      .then((res) => res.json())
      .then((data) => {
        const ordenado = [...data].sort(
          (a, b) => b.faturamento - a.faturamento,
        );
        const comRank = ordenado.map((item, index) => ({
          ...item,
          rank: index + 1,
        }));
        setDados(comRank);
      })
      .catch((err) => console.error('Erro:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const hoje = new Date();
    hoje.setHours(hoje.getHours() - 3); // Fuso horário de Brasília
    const dataBrasilia = hoje.toISOString().split('T')[0];
    setDataInicio(dataBrasilia);
    setDataFim(dataBrasilia);
    buscarDados(dataBrasilia, dataBrasilia);
  }, []);

  return (
    <>
      <Nav />
      <div className="p-6 space-y-4">
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
            onClick={() => buscarDados()}
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
          <table className="text-left text-xs">
            <thead className="uppercase tracking-wider border-b-2 text-center whitespace-nowrap">
              <tr>
                <th scope="col" className="py-3 px-1 text-base">
                  Rank
                </th>
                <th scope="col" className="py-3 px-1 text-base">
                  Empresa
                </th>
                <th scope="col" className="py-3 px-1 text-base">
                  Faturamento
                </th>
                <th scope="col" className="py-3 px-1 text-base">
                  PA
                </th>
                <th scope="col" className="py-3 px-1 text-base">
                  Ticket Médio
                </th>
              </tr>
            </thead>
            <tbody>
              {dados.map((item) => (
                <tr key={item.cd_grupoempresa} className="border-b-2">
                  <th className="py-3 px-1 text-base text-center whitespace-nowrap">
                    {item.faturamento > 0 ? item.rank : null}
                  </th>
                  <td
                    className="py-3 px-1 text-base text-center "
                    title={item.nome_vendedor}
                  >
                    {item.faturamento > 0 ? item.nome_vendedor : null}
                  </td>
                  <td className="py-3 px-1 text-base text-center  whitespace-nowrap ">
                    {item.faturamento.toFixed(2) > 1
                      ? item.faturamento.toFixed(2)
                      : null}
                  </td>
                  <td className="py-3 px-1 text-base text-center  whitespace-nowrap ">
                    {item.faturamento > 0
                      ? Number.parseFloat(
                          (+item.pasaida - +item.paentrada) / +item.trasaida,
                        ).toFixed(2)
                      : null}
                  </td>
                  <td className="py-3 px-1 text-base text-center  whitespace-nowrap ">
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
};

export default Estoque;
