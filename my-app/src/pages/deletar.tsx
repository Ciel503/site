import { useEffect, useState } from 'react';
import { processImageUrl } from '../utils/imageUtils';

const Deletar = () => {
  const [dados, setDados] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const resposta = await fetch('/api/consutaDados');
        if (!resposta.ok) {
          throw new Error('Erro ao buscar dados');
        }
        const dados = await resposta.json();
        setDados(dados);
      } catch (error) {
        setErro('Erro ao carregar os dados');
        console.error('Erro:', error);
      }
    };

    buscarDados();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      console.log('Tentando deletar item com ID:', id);
      const resposta = await fetch(`/api/deletarDado/${id}`, {
        method: 'DELETE',
      });

      const data = await resposta.json();
      console.log('Resposta do servidor:', data);

      if (!resposta.ok) {
        throw new Error(data.message || 'Erro ao deletar item');
      }

      // Atualiza a lista removendo o item deletado
      setDados(dados.filter((item: any) => item._id !== id));
      setErro(''); // Limpa qualquer erro anterior
    } catch (error: any) {
      console.error('Erro detalhado:', error);
      setErro(error.message || 'Erro ao deletar o item');
    }
  };

  return (
    <div id="container" className="container" >
      {erro && (
        <div className="text-red-600 mb-4">
          {erro}
        </div>
      )}
      
      {dados.length > 0 ? (
        <div className="grid-container">
          {dados.map((item: any) => (
            <div key={item._id} className="card">
              <img 
                className="card-image" 
                src={processImageUrl(item.url)} 
                alt="perfume imagem" 
              />
              <p className="card-description">{item.descricao}</p>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Deletar
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
};

export default Deletar;