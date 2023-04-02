import axios from "axios";
// const baseUrl = "http://localhost:3001/api/users";
const baseUrl = "https://bloglist.akthanki.repl.co/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const getByID = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getByID };