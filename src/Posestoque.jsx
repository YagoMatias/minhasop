import { useState } from "react";
import Nav from "./Nav";

const Posestoque = () => {
   const [dados,setDados] = useState([]);
   const [loading, setLoading] = useState(false);
   const BaseURL = 'https://apicrosby-fpp9p.ondigitalocean.app/';

   const buscarDados = async () => {
    setLoading(true)
     try {
       const res = await fetch(`${BaseURL}estoque`);
       const data = await res.json();
       setDados(data);
     } catch (err) {
       console.error('Erro:', err);
     } finally {
      setLoading(false);
     }
   };
   return  (
     <>
       <Nav />
           <button
            onClick={() => buscarDados()}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded font-semibold shadow-md m-10"
          >
            Buscar Estoque
          </button>
          {loading ? (
          <div className="flex justify-center items-center mt-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
           <div className="block max-[500px]:overflow-x-auto max-[500px]:w-[350px]">
             <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-lg">
               <thead className="bg-gray-900 text-white text-sm uppercase tracking-wider">
                 <tr>
                   <th className="px-4 py-3 text-left text-xs">Cod. Empresa</th>
                   <th className="px-4 py-3 text-left text-xs">
                     Empresa
                   </th>
                   <th className="px-4 py-3 text-center text-xs">
                     Saldo Estoque
                   </th>
                   <th className="px-4 py-3 text-center text-xs">
                     VALOR ESTOQUE
                   </th>
                 </tr>
               </thead>
               <tbody>
                 {dados.map((item) =>
                   (
                     <tr
                       key={item.cd_grupoempresa}
                       className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 text-sm border-b "
                     >
                       <td className="px-4 py-3 text-center font-bold text-blue-700 text-xs">
                         {item.cd_grupoempresa}
                       </td>
                       <td className="px-4 py-3 font-bold text-blue-700 text-xs">
                         {item.nome}
                       </td>
                       <td className={`px-4 py-3 text-center font-medium text-xs ${
                          item.saldo < 0 ? 'text-red-600' : ''}`} >
                         {item.saldo}
                       </td>
                       <td className={`px-4 py-3 text-center font-semibold text-xs ${
                             item.valor < 0 ? 'text-red-600' : 'text-green-600'}`} >
                           {item.valor.toLocaleString('pt-BR', {
                             style: 'currency',
                             currency: 'BRL',
                           })}
                         </td>
                     </tr>
                   )
                 )}
               </tbody>
             </table>
           </div>)}
       </> )
   
};

export default Posestoque;
