// ** React Imports
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ** Configs
import { getUsers } from "../../../services/users";

// ** Reactstrap Imports
import { Table } from "reactstrap";
import { Edit } from "react-feather";

const ListUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const usersData = await getUsers();
    setUsers(usersData.data);
  }

  function renderPost() {
    return users.map((user, i) => {
      return (
        <tr key={i}>
          <td>{user.displayname}</td>
          <td>{user.email}</td>
          <td>{user.status}</td>
          <td>
            <Link to={`/user/${user.id}`}>
              <Edit className="feather" />
            </Link>
          </td>
        </tr>
      );
    });
  }

  return (
    <div>
      <h2>Utilizadores</h2>
      <Table>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Email</td>
            <td>Estado</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>{renderPost()}</tbody>
      </Table>
    </div>
  );
};

export default ListUsers;
