import axios from "../config/axios";

const getPosts = () => {
  return axios.get("/posts");
};

const getPost = (id) => {
  return axios.get(`/posts/${id}`);
};

const createPost = (data) => {
  return axios.post("/posts", data);
};

const updatePost = (id, data) => {
  return axios.put(`/posts/${id}`, data);
};

const deletePost = (id) => {
  return axios.delete(`/posts/${id}`);
};

export { getPosts, getPost, createPost, updatePost, deletePost };
