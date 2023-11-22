import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { CardAutor } from '../components/CardAutor';
import './styles.css'; // Asegúrate de que la ruta sea correcta

export const AddArticle = () => {
  const [autores, setAutores] = useState([]);

  const fetchAutor = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/autor');

      if (!response.ok) {
        console.error('La solicitud no fue exitosa. Código de estado:', response.status);
        return;
      }
      const data = await response.json();
      console.log(data.body);
      setAutores(data.body);
    } catch (error) {
      console.error('Error durante la solicitud:', error);
    }
  };

  useEffect(() => {
    fetchAutor();
  }, []);

  return (
    <>
    <h1>Añadir articulo</h1>
    <Container maxWidth="sm" className="add-article-container">
      <hr />
      {autores.length > 0 ? (
        autores.map((autor, index) => (
          <CardAutor
            key={index}
            id={autor.id}
            nombre={autor.nombre}
            apellido={autor.apellido}
            institucion={autor.institucion}
          />
        ))
      ) : (
        <p>No hay artículos disponibles.</p>
      )}
    </Container>
    </>
  );
};
