export const processImageUrl = (url: string): string => {
  // Se for uma URL do Google Drive
  if (url.includes('drive.google.com')) {
    // Tenta extrair o ID do arquivo de diferentes formatos de URL
    let fileId = '';
    
    // Formato 1: drive.google.com/file/d/ID/view
    if (url.includes('/file/d/')) {
      fileId = url.split('/file/d/')[1].split('/')[0];
    }
    // Formato 2: drive.google.com/uc?export=view&id=ID
    else if (url.includes('uc?export=view&id=')) {
      fileId = url.split('uc?export=view&id=')[1];
    }
    // Formato 3: drive.google.com/open?id=ID
    else if (url.includes('open?id=')) {
      fileId = url.split('open?id=')[1];
    }
    
    if (fileId) {
      // Remove qualquer parâmetro adicional após o ID
      fileId = fileId.split('&')[0].split('?')[0];
      // Remove qualquer caractere após o ID que não seja alfanumérico
      fileId = fileId.replace(/[^a-zA-Z0-9-]/g, '');
      // Converte para URL direta de visualização
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  }
  
  // Se for uma URL do Cloudinary
  if (url.includes('cloudinary.com')) {
    // Se for uma URL do console do Cloudinary, extrai o public_id
    if (url.includes('console.cloudinary.com')) {
      const publicId = url.split('/').pop();
      if (publicId) {
        return `https://res.cloudinary.com/djbvc2cly/image/upload/v1/${publicId}`;
      }
    }
    // Se começar com asset.cloudinary.com, converte para res.cloudinary.com
    if (url.startsWith('https://asset.cloudinary.com')) {
      return url.replace('https://asset.cloudinary.com', 'https://res.cloudinary.com');
    }
  }

  return url;
}; 