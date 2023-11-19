import React from 'react'
import ReactDOM from 'react-dom/client'
import { ArticuloApp } from './ArticuloApp'
import {BrowserRouter} from "react-router-dom"
import '@mui/material/styles';
ReactDOM.createRoot(document.getElementById('root')).render(
 <BrowserRouter>
  <React.StrictMode>
    <ArticuloApp />
  </React.StrictMode>
  </BrowserRouter>,
)
