import { useForm}  from  "react-hook-form"

import axios from "axios";


type FormData = {
  url: string,
  descricao: string,
 
}


const Adicionar = () =>{

  const {handleSubmit, register, reset} = useForm<FormData>();
  
  const onSubmit = async (data:FormData) => {
    console.log('Dados a serem enviados:', data);
    try {
      const response = await axios.post('/api/user', {
        url: data.url,
        descricao: data.descricao
      });
      console.log('Dados enviados com sucesso:', response.data);
      alert('Dados salvos com sucesso!');
      reset(); // Limpa o formulário após sucesso
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const mensagem = error.response?.data?.error || 'Erro ao enviar dados';
        console.error('Erro:', mensagem);
        alert(`Erro: ${mensagem}`);
      } else {
        console.error('Erro desconhecido:', error);
        alert('Erro desconhecido ao salvar os dados');
      }
    }
  }


  
    return (
      
      
      <div className="container p-4">
     
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="url" className="block mb-2">URL:</label>
            <input 
              {...register("url")} 
              type="text" 
              id="url"
              className="w-full p-2 border rounded"
              placeholder="Digite a URL"
            />
          </div>
          
          <div>
            <label htmlFor="descricao" className="block mb-2">Descrição:</label>
            <input 
              {...register("descricao")} 
              type="text" 
              id="descricao"
              className="w-full p-2 border rounded"
              placeholder="Digite a descrição"
            />
          </div>

          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Adicionar
          </button>
        </form>
        <div id="resultado">
            
        </div>
      
      </div>
      
  
  );
}

export default Adicionar;