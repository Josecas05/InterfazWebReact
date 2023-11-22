import { useState, useContext,useEffect } from 'react';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent'
import { CardAutor } from '../components/CardAutor';
import './styles.css';
import { AutoresContext } from '../context/AutoresContext';
import { FormContext } from '../context/FormContext';

export const AddArticle = () => {
  const { autores } = useContext(AutoresContext);
  const { listaAutores, agregarAutor, quitarAutor } = useContext(FormContext);
  
  const [titulo, setTitulo] = useState('');
  const [resumen, setResumen] = useState('');
  const [contenido, setContenido] = useState('');
  const [autoresSeleccionados, setAutoresSeleccionados] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleAgregar = (select) => {
    agregarAutor(select);
    setAutoresSeleccionados((prevAutores) => [...prevAutores, select.id]); // Agrega el ID al array
    console.log(autoresSeleccionados)
  };

  const handleQuitar = (id) => {
    quitarAutor(id);
    setAutoresSeleccionados((prevAutores) => prevAutores.filter((autorId) => autorId !== id));
   // Elimina el ID del array
  };
  const [ultimoCodigoArticulo, setUltimoCodigoArticulo] = useState(0);

useEffect(() => {
  const obtenerUltimoCodigo = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/articulo/');
      if (!response.ok) {
        console.error('La solicitud no fue exitosa. Código de estado:', response.status);
        return;
      }
      const data = await response.json();
      const ultimoId = data.body[data.body.length - 1]?.id || 0; // Obtener el último id o usar 0 si no hay registros
      setUltimoCodigoArticulo(ultimoId + 1);
    } catch (error) {
      console.error('Error durante la solicitud:', error);
    }
  };

  obtenerUltimoCodigo();
}, []);// Ejecutar solo una vez al montar el componente
  const obtenerFechaActual = () => {
  const fecha = new Date();
  const year = fecha.getFullYear();
  const month = fecha.getMonth() + 1; // Se suma 1 porque los meses en JavaScript son de 0 a 11
  const day = fecha.getDate();

  // Formatear la fecha como "YYYY-MM-DD"
  return `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;
};
  const handleAgregarArticulo = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/articulo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id:0,
          titulo,
          resumen,
          contenido,
          activo:1
        }),
      });

      if (!response.ok) {
        console.error('La solicitud no fue exitosa. Código de estado:', response.status);
        return;
      }

      const data = await response.json();
      console.log('Artículo agregado exitosamente:', data);
      
      for (const idAutor of autoresSeleccionados) {
        const responseAutorArticulo = await fetch(
          "http://localhost:4000/api/autorArticulo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idAutor,
              idArticulo: ultimoCodigoArticulo,
              fecha: obtenerFechaActual(), // Función para obtener la fecha actual
            }),
          }
        );

        if (!responseAutorArticulo.ok) {
          console.error('La solicitud para agregar el registro en autorArticulo no fue exitosa. Código de estado:', responseAutorArticulo.status);
          // Puedes manejar el error según tus necesidades
        }
      }

      console.log('Artículo y registros en autorArticulo agregados exitosamente.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error durante la solicitud:', error);
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="article-container">
      <h1>Añadir artículo</h1>
      <div className="article-containers">
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
                handleAgregar={() => handleAgregar(autor)}
                handleQuitar ={() => handleQuitar(autor.id)}
              />
            ))
          ) : (
            <p>No hay artículos disponibles.</p>
          )}
        </Container>
        <Container maxWidth="sm" className="add-article-container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">id Autor</th>
                <th scope="col">Nombre</th>
                <th scope="col">apellido</th>
                <th scope="col">Institucion</th>
              </tr>
            </thead>
            <tbody>
              {
                listaAutores.map(item =>(
                <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.nombre}</td>
                <td>{item.apellido}</td>
                <td>{item.institucion}</td>
              </tr>
                ))
              }
              
            </tbody>
          </table>
          <Container maxWidth="sm" className="add-article-container">
          <div className="form-group">
            <label htmlFor="titulo">Título:</label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="resumen">Resumen:</label>
            <textarea
              id="resumen"
              value={resumen}
              onChange={(e) => setResumen(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contenido">Contenido:</label>
            <textarea
              id="contenido"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="form-control"
            />
          </div>
        </Container>
          <div>
          <button className="btn btn-primary" onClick={handleAgregarArticulo}>
              Agregar Articulo
            </button>
            </div>
        </Container>
      </div>
      <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContent
          message="Artículo agregado exitosamente"
          style={{ backgroundColor: 'green' }}
        />
      </Snackbar>
    </div>
    </div>
  );
};
