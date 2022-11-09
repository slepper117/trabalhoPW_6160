// ** React Imports
import { Link, NavLink } from "react-router-dom";

// ** Reactstrap Imports
import { Nav, NavItem } from "reactstrap";
import { Home, Users, File, FileText, PlusCircle } from "react-feather";

const Sidebar = () => {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <Nav className="flex-column">
          <NavItem>
            <NavLink to="dashboard" className="nav-link">
              <Home className="feather" />
              Dashboard
            </NavLink>
          </NavItem>
        </Nav>
        <Nav className="flex-column mb-2">
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Blog</span>
            <Link
              to="blog/add"
              className="link-secondary"
              aria-label="Adicionar novo Post"
            >
              <PlusCircle className="feather" />
            </Link>
          </h6>
          <NavItem>
            <NavLink to="blog" className="nav-link" end>
              <File className="feather" />
              Posts
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="blog/categories" className="nav-link">
              <FileText className="feather" />
              Categorias
            </NavLink>
          </NavItem>
        </Nav>
        <Nav className="flex-column mb-2">
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Administração</span>
            <Link
              to="users/add"
              className="link-secondary"
              aria-label="Adicionar novo utilizador"
            >
              <PlusCircle className="feather" />
            </Link>
          </h6>
          <NavItem>
            <NavLink to="users" className="nav-link">
              <Users className="feather" />
              Utilizadores
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </nav>
  );
};

export default Sidebar;
