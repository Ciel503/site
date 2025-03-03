import { useEffect, useState } from 'react';
import { processImageUrl } from '../utils/imageUtils';

const Home = () => {
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
                alt="imagem" 
                onError={(e) => {
                  console.error('Erro ao carregar imagem:', {
                    originalUrl: item.url,
                    processedUrl: processImageUrl(item.url),
                    error: e
                  });
                  e.currentTarget.src = '/placeholder.jpg';
                }}
              />
              <p className="card-description">{item.descricao}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
};

export default Home;