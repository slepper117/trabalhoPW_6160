import axios from "../config/axios";

const authLogin = (data) => {
  return axios.post("auth/login", data);
};

const authLoggedIn = () => {
  return axios.get("auth/loggedIn");
};

const authLogOut = () => {
  return axios.get("auth/logout");
};

export { authLogin, authLoggedIn, authLogOut };
