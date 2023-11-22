import { useContext } from 'react';
import Container from '@mui/material/Container';
import { CardAutor } from '../components/CardAutor';
import './styles.css'; // Asegúrate de que la ruta sea correcta
import { AutoresContext } from '../context/AutoresContext';
import { FormContext } from '../context/FormContext';

export const AddArticle = () => {
 const {autores} = useContext (AutoresContext)
 const {listaAutores,agregarAutor,quitarAutor} = useContext(FormContext)
 
 const handleAgregar = (select) =>{
  agregarAutor(select)
 }
 const handleQuitar = (id) =>{
  quitarAutor(id)
 }
 
  return (
    <div className="article-container">
      <h1>Añadir articulo</h1>
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
                <th scope="col">Institucion</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {
                listaAutores.map(item =>(
                <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.nombre}</td>
                <td>{item.institucion}</td>
                <td><button
                            type='button'
                            className='btn btn-danger'
                            onClick={()=> quitarAutor(item.id)}>
                           Eliminar 
                  </button></td>
              </tr>
                ))
              }
              
            </tbody>
          </table>
          <div>
            <button className="btn btn-primary">Agregar Articulo</button>
          </div>
        </Container>
      </div>
    </div>
  );
};
