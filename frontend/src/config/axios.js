import axios from "axios";

export default axios.create({
  baseURL: "https://rdantas-api.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
