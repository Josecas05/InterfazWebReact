
import { Book as BookIcon, PostAdd as PostAddIcon,EditCalendar as EditCalendarIcon } from '@mui/icons-material';
import { NavLink } from 'react-router-dom'; 
export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg flex-column bg-body-tertiary">
      <NavLink to='/' className="navbar-brand">
        Articulos <BookIcon color="success" />
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to='/agregar' className="nav-link active">
              <PostAddIcon /> Agregar Articulo
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/fechas' className="nav-link active">
              <EditCalendarIcon /> Ver articulos por fecha
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>

  );
}
