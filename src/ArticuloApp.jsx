import {Navigate, Route, Routes} from "react-router-dom"
import { NavBar } from "./components/NavBar"
import { ListArticle } from "./pages/ListArticle";
import { AddArticle } from "./pages/AddArticle";
import { DateArticle } from "./pages/DateArticle";

export const ArticuloApp = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="container">
      <Routes>
        <Route path="/" element = {<ListArticle></ListArticle>}></Route>
        <Route path="/agregar" element={<AddArticle></AddArticle>}></Route>
        <Route path="/fecha" element ={<DateArticle></DateArticle>}></Route>
        <Route path="/*" element ={<Navigate to='/'/>}></Route>
      </Routes>
      </div>
    </>
  );
}

