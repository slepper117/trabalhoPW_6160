import axios from "../config/axios";

const getPostCats = () => {
  return axios.get("/posts/categories");
};

const getPostCat = (id) => {
  return axios.get(`/posts/categories/${id}`);
};

const createPostCat = (data) => {
  return axios.post("/posts/categories", data);
};

const updatePostCat = (id, data) => {
  return axios.put(`/posts/categories/${id}`, data);
};

const removePostCat = (id) => {
  return axios.delete(`/posts/categories/${id}`);
};

export { getPostCats, getPostCat, createPostCat, updatePostCat, removePostCat };
