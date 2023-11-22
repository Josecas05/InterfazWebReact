import {Navigate, Route, Routes} from "react-router-dom"
import { NavBar } from "./components/NavBar"
import { ListArticle } from "./pages/ListArticle";
import { AddArticle } from "./pages/AddArticle";
import { DateArticle } from "./pages/DateArticle";
import { AutoresProvider } from "./context/AutoresProvider";
import { FormProvider } from "./context/FormProvider";

export const ArticuloApp = () => {
  return (
    <AutoresProvider>
      <FormProvider>
      <NavBar></NavBar>
      <div className="container">
      <Routes>
        <Route path="/" element = {<ListArticle></ListArticle>}></Route>
        <Route path="/agregar" element={<AddArticle></AddArticle>}></Route>
        <Route path="/fechas" element ={<DateArticle></DateArticle>}></Route>
        <Route path="/*" element ={<Navigate to='/'/>}></Route>
      </Routes>
      </div>
      </FormProvider>
    </AutoresProvider>
  );
}

