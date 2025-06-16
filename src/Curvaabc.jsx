import { useState, useEffect } from "react";
import Nav from "./Nav";

const Curvaabc = () => {
  const [dados, setDados] = useState([]);
  const [empresas, setEmpresas] = useState([]); // Novo estado para armazenar a lista de empresas
  const [loading, setLoading] = useState(false);
  const [cdGrupoempresa, setCdGrupoempresa] = useState(''); // Filtro por código da empresa
  const [inicio, setInicio] = useState(''); // Filtro de data inicial
  const [fim, setFim] = useState(''); // Filtro de data final
  const [pesquisarPor, setPesquisarPor] = useState('grupo'); // Estado para selecionar "grupo" ou "produto"
  const BaseURL = 'https://apicrosby-fpp9p.ondigitalocean.app/';

  // Buscar as empresas disponíveis para o filtro
  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const res = await fetch(`${BaseURL}empresas`); // Endpoint que retorna a lista de empresas
        const data = await res.json();
        setEmpresas(data);
      } catch (err) {
        console.error('Erro ao buscar empresas:', err);
      }
    };
    
    fetchEmpresas();
  }, []);

  // Função para buscar os dados da API
  const buscarDados = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BaseURL}curvaabc?inicio=${inicio}&fim=${fim}&cd_grupoempresa=${cdGrupoempresa}`
      );
      const data = await res.json();
      let groupedData = [];

      // Agrupando e somando os valores dependendo da seleção do filtro
      if (pesquisarPor === 'grupo') {
        // Agrupar por nm_grupo (nome do grupo)
        groupedData = data.reduce((acc, item) => {
          const grupoExistente = acc.find(g => g.nmgrupo === item.nmgrupo); // Agrupar pelo nome do grupo
          if (grupoExistente) {
            grupoExistente.valorvendido += item.valorvendido; // Somando os valores
          } else {
            acc.push({
              grupo: item.grupo,  // Código do grupo
              nmgrupo: item.nmgrupo,  // Nome do grupo
              valorvendido: item.valorvendido
            });
          }
          return acc;
        }, []);
      } else if (pesquisarPor === 'produto') {
        // Agrupar por nm_produto (nome do produto)
        groupedData = data.reduce((acc, item) => {
          const produtoExistente = acc.find(p => p.nmproduto === item.nmproduto); // Agrupar pelo nome do produto
          if (produtoExistente) {
            produtoExistente.valorvendido += item.valorvendido; // Somando os valores
          } else {
            acc.push({
              produto: item.item.cd_produto,  // Nome do produto
              nmproduto: item.nmproduto,  // Nome completo do produto
              valorvendido: item.valorvendido
            });
          }
          return acc;
        }, []);
      }

      // Ordenando os dados por valorvendido, do maior para o menor
      groupedData.sort((a, b) => b.valorvendido - a.valorvendido);

      // Adicionando o rank baseado na ordem dos dados
      groupedData = groupedData.map((item, index) => ({
        ...item,
        rank: index + 1 // Adiciona a posição de rank (começando de 1)
      }));

      setDados(groupedData); // Atualizando os dados agrupados
    } catch (err) {
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="m-10">
        {/* Filtro por Código da Empresa (Dropdown) */}
        <select
          value={cdGrupoempresa}
          onChange={(e) => setCdGrupoempresa(e.target.value)} // Atualiza o filtro conforme o usuário seleciona
          className="border px-4 py-2 rounded-lg shadow-md mb-4 w-full sm:w-auto"
        >
          <option value="">Selecione a Empresa</option>
          {empresas.map((empresa) => (
            <option key={empresa.cd_grupoempresa} value={empresa.cd_grupoempresa}>
              {empresa.nm_grupoempresa}
            </option>
          ))}
        </select>

        {/* Filtro "Pesquisar por" */}
        <select
          value={pesquisarPor}
          onChange={(e) => setPesquisarPor(e.target.value)} // Atualiza a opção de agrupamento
          className="border px-4 py-2 rounded-lg shadow-md mb-4 w-full sm:w-auto"
        >
          <option value="grupo">Pesquisar por Grupo</option>
          <option value="produto">Pesquisar por Produto</option>
        </select>

        {/* Filtro por Data Inicial */}
        <input
          type="date"
          value={inicio}
          onChange={(e) => setInicio(e.target.value)} // Atualiza o filtro de data inicial
          className="border px-4 py-2 rounded-lg shadow-md mb-4 w-full sm:w-auto"
        />

        {/* Filtro por Data Final */}
        <input
          type="date"
          value={fim}
          onChange={(e) => setFim(e.target.value)} // Atualiza o filtro de data final
          className="border px-4 py-2 rounded-lg shadow-md mb-4 w-full sm:w-auto"
        />

        <button
          onClick={() => buscarDados()}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded font-semibold shadow-md"
        >
          Buscar Estoque
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="block max-[500px]:overflow-x-auto max-[500px]:w-[350px]">
          <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-900 text-white text-sm uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 text-left text-xs">Rank</th>
                <th className="px-4 py-3 text-left text-xs">Grupo/Produto</th>
                <th className="px-4 py-3 text-left text-xs">Nome Grupo/Produto</th>
                <th className="px-4 py-3 text-center text-xs">Valor de Venda</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((item, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 text-sm border-b"
                >
                  {/* Exibindo o Rank */}
                  <td className="px-4 py-3 font-bold text-blue-700 text-xs">
                    {item.rank}
                  </td>

                  {/* Exibição Condicional do Grupo ou Produto */}
                  <td className="px-4 py-3 font-bold text-blue-700 text-xs">
                    {pesquisarPor === 'grupo' ? item.grupo : item.cd_produto}
                  </td>

                  <td className="px-4 py-3 font-bold text-blue-700 text-xs">
                    {pesquisarPor === 'grupo' ? item.nmgrupo : item.nmproduto}
                  </td>

                  <td
                    className={`px-4 py-3 text-center font-medium text-xs ${
                      item.valorvendido < 0 ? "text-red-600" : ""
                    }`}
                  >
                    {item.valorvendido.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
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

export default Curvaabc;
