// ** React Imports
import React from "react";
import { Outlet } from "react-router-dom";

// ** Reactstrap Imports
import { Container, Row } from "reactstrap";

// ** Componentes
import Header from "./elements/header";
import Sidebar from "./elements/sidebar";

const MainLayout = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <Container fluid>
        <Row>
          <Sidebar />
          <Outlet />
        </Row>
      </Container>
    </div>
  );
};

export default MainLayout;
