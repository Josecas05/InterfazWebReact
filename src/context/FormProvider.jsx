import { useReducer } from 'react'
import {FormContext} from './FormContext'
const initalState = []
const autoresReudcer = (state = initalState, action ={}) =>{
    switch (action.type) {
        case '[FORM] Agregar Autor':
            return [...state,action.payload];
        case '[FORM] Quitar Autor':
            return state.filter(select => select.id !== action.payload);
        default:
            return state;
    }
}
export const FormProvider = ({children}) => {
    const [listaAutores, dispatch] = useReducer(autoresReudcer, initalState)
    
    const agregarAutor =(select) =>{
        const action = {
            type: '[FORM] Agregar Autor',
            payload: select
        }
        dispatch(action)
    }
    const quitarAutor  =(id) =>{
        const action = {
            type: '[FORM] Quitar Autor',
            payload: id
        }
        dispatch(action)
    }
   
  return (
    <FormContext.Provider value={{listaAutores,agregarAutor,quitarAutor}}>
        {children}
    </FormContext.Provider>
  )
}
