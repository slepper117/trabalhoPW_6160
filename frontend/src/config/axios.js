import axios from "axios";

export default axios.create({
  baseURL: "localhost:5000",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
