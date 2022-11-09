import axios from "../config/axios";

const getUsers = () => {
  return axios.get("/users");
};

const getUser = (id) => {
  return axios.get(`/users/${id}`);
};

const createUser = (data) => {
  return axios.post("/users", data);
};

const updateUser = (id, data) => {
  return axios.put(`/users/${id}`, data);
};

const deleteUser = (id) => {
  return axios.delete(`/users/${id}`);
};

export { getUsers, getUser, createUser, updateUser, deleteUser };
