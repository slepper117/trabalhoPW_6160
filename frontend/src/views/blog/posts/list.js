// ** React Imports
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ** Configs
import { getPosts } from "../../../services/post";

// ** Reactstrap Imports
import { Table } from "reactstrap";
import { Edit } from "react-feather";

const ListPosts = () => {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const posts = await getPosts();
    setPost(posts.data);
  }

  function renderPost() {
    return posts.map((post, i) => {
      return (
        <tr key={i}>
          <td>{post.title}</td>
          <td>{post.status}</td>
          <td>{post.date}</td>
          <td>
            <Link to={`/blog/${post.id}`}>
              <Edit className="feather" />
            </Link>
          </td>
        </tr>
      );
    });
  }

  return (
    <div>
      <h2>Posts</h2>
      <Table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Status</td>
            <td>Date</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>{renderPost()}</tbody>
      </Table>
    </div>
  );
};

export default ListPosts;
