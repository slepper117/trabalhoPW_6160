// ** React Imports
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ** Configs
import { getPostCats } from "../../../services/postCats";

// ** Reactstrap Imports
import { Table } from "reactstrap";
import { Edit } from "react-feather";

const ListPostCats = () => {
  const [postCats, setPostCats] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const postCats = await getPostCats();
    setPostCats(postCats.data);
  }

  function renderPost() {
    return postCats.map((postCat, i) => {
      return (
        <tr key={i}>
          <td>{postCat.name}</td>
          <td>{postCat.count}</td>
          <td>
            <Link to={`/blog/categories/${postCat.id}`}>
              <Edit className="feather" />
            </Link>
          </td>
        </tr>
      );
    });
  }

  return (
    <div>
      <h2>Categorias</h2>
      <Table>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Contagem de Posts</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>{renderPost()}</tbody>
      </Table>
    </div>
  );
};

export default ListPostCats;
