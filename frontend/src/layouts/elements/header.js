// ** React Imports
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// ** Reactstrap Imports
import { Button } from "reactstrap";

import { authLogOut } from "../../services/auth";
import UserContext from "../../context/user";

const Header = () => {
  const { getUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function logOut() {
    await authLogOut();
    await getUser();
    navigate("/", { replace: true });
  }

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="dashboard">
        CRM AAIPCA
      </Link>
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-nav">
        <div className="nav-item text-nowrap">
          <Button className="nav-link px-3" onClick={logOut}>
            Log Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
