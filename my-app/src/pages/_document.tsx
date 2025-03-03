import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <header style={{ 
          backgroundColor: '#6B46C1', 
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ 
            color: 'white', 
            fontSize: '1.5rem',
            fontWeight: 'bold',
            margin: 0
          }}>
            <a href="/" style={{ 
              color: 'white',
              textDecoration: 'none'
            }}>
              FRANCIEL
            </a>
          </h1>
          
          <nav style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <a href="/adicionar" style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              backgroundColor: 'rgba(255,255,255,0.1)',
              transition: 'background-color 0.2s'
            }}>
              Adicionar
            </a>
            <a href="/deletar" style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              backgroundColor: 'rgba(255,255,255,0.1)',
              transition: 'background-color 0.2s'
            }}>
              DELETAR
            </a>
          </nav>
        </header>
      </Head> 

      
      <body className="antialiased"  >

        
        <Main/>
        <NextScript />
      </body>
    </Html>
  );
}
