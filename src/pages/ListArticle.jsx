import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
 
export const ListArticle = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/autorArticulo');

      if (!response.ok) {
        console.error('La solicitud no fue exitosa. Código de estado:', response.status);
        return;
      }

      const data = await response.json();
      console.log(data.body);
      setArticles(data.body);
    } catch (error) {
      console.error('Error durante la solicitud:', error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <h1>Articulos</h1>
      <hr />
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <Card
            key={index}
            idarticulo={article.idArticulo}
            autor={article.nombreAutor}
            articulo={article.tituloArticulo}
            fecha={article.fecha}
          ></Card> 
        ))
      ) : (
        <p>No hay artículos disponibles.</p>
      )}
    </>
  );
};
