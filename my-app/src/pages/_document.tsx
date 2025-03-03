import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
      <header style={{ 
          
          backgroundColor: '#6B46C1', 
          padding: '1rem', 
          display: 'flex', 
          flexWrap: 'wrap',
          
          
          
        }}>
          <div style={{ width: '100px' }}></div>
          <h1 style={{ 
            
            color: 'white', 
            margin: 'auto',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            <a href="/" style={{ 
              
              color: 'white', textDecoration: 'none' 
              }}>
            FRANCIEL</a>
          </h1>
          <a href="/adicionar" style={{
           
            color: 'white',
            textDecoration: 'none',
            padding: '2px',
            borderRadius: '0.25rem',
            
          }}>
            Adicionar
          </a>
          &&
          <a href="/deletar" style={{
            color: 'white',
            textDecoration: 'none',
            padding: '2px',
            borderRadius: '0.25rem',
            
          }}>
            DELETAR
          </a>

        </header>
      </Head> 

      
      <body className="antialiased"  >

        
        <Main/>
        <NextScript />
      </body>
    </Html>
  );
}
