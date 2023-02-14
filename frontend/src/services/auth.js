import axios from "../config/axios";

const authLogin = (data) => {
  return axios.post("auth/login", data);
};

const authLogOut = () => {
  return axios.get("auth/logout");
};

const authLoggedIn = () => {
  return axios.get("auth/isAuthenticated");
};

export { authLogin, authLoggedIn, authLogOut };
