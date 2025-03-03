import { useForm } from "react-hook-form"
import axios from "axios";
import { useState } from "react";

type FormData = {
  imagem: FileList,
  descricao: string,
}

const Adicionar = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { handleSubmit, register, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append('imagem', data.imagem[0]);
      formData.append('descricao', data.descricao);

      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Dados enviados com sucesso:', response.data);
      alert('Imagem enviada com sucesso!');
      setPreviewUrl(null);
      reset();
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="imagem" className="block mb-2">Imagem:</label>
          <input
            {...register("imagem")}
            type="file"
            id="imagem"
            accept="image/*"
            className="w-full p-2 border rounded"
            onChange={handleImageChange}
          />
          {previewUrl && (
            <div className="mt-2">
              <img src={previewUrl} alt="Preview" className="max-w-xs rounded" width={200}/>
            </div>
          )}
        </div>

        {/* <div>
          <label htmlFor="descricao" className="block mb-2">Descrição:</label>
          <input
            {...register("descricao")}
            type="text"
            id="descricao"
            className="w-full p-2 border rounded"
            placeholder="Digite a descrição"
          />
        </div> */}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Adicionar
        </button>
      </form>
    </div>
  );
}

export default Adicionar;