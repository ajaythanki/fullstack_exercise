import axios from "axios";
// const baseUrl = "https://nodejsexercise.akthanki.repl.co/api/notes";
const baseUrl = "http://localhost:3001/api/notes";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, {
    headers: { Authorization: token },
  });
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};
const noteService = {
  getAll,
  create,
  update,
  setToken,
};
export default noteService;
