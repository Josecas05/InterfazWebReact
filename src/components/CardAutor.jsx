import  { useState } from "react";
import Button from "@mui/material/Button";


export const CardAutor = ({ id, nombre,apellido, institucion, handleAgregar,handleQuitar}) => {
  const [added, setAdded] = useState(true);
  const clickAgregar = () =>{
    
    handleQuitar()
    setAdded(true)
    console.log(id)
  }
  const clickQuitar = () =>{
    handleAgregar()
    setAdded(false)
    console.log(id)
  }


  return (
    <div className="card">
      <h5 className="card-header">{nombre}</h5>
      <div className="card-body">
        <h5 className="card-title">{apellido}</h5>
        <p className="card-text">{institucion}</p>
        </div>
        {added ? 
          <Button variant="contained" color="primary" onClick={clickQuitar}>
            agregar
          </Button>
         : <Button variant="contained" color="secondary" onClick={clickAgregar}>
            Eliminar
          </Button>
        }
      
    </div>
  );
};
