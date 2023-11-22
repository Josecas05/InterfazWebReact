import { useEffect, useState } from "react";
import { AutoresContext } from "./AutoresContext"

export const AutoresProvider = ({children}) => {
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
    <AutoresContext.Provider value={{autores}}>
        {children}
    </AutoresContext.Provider>
  )
}
