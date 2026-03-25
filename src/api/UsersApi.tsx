import axios from "axios";
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export const get = (apiUrl: string) => {
  return api.get(apiUrl);
};
