import { useEffect, useState } from 'react';
import { Card } from '../components/Card';

export const DateArticle = () => {
  const [articles, setArticles] = useState([]);
  const [startDate, setStartDate] = useState(getDefaultStartDate());
  const [endDate, setEndDate] = useState(getDefaultEndDate());

  function getDefaultStartDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getDefaultEndDate() {
    // Puedes establecer la fecha actual como fecha de inicio por defecto y luego ajustarla según tus necesidades.
    return getDefaultStartDate();
  }

  const fetchArticlesByDateRange = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/autorArticulo/${startDate}/${endDate}`);

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
    fetchArticlesByDateRange();
  }, [startDate, endDate]);

  return (
    <>
      <h1>Articulos</h1>
      <div className="mb-3">
        <label className="form-label"><h4>Fecha de inicio:</h4></label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label"><h4>Fecha de fin:</h4></label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="form-control"
        />
      </div>
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
