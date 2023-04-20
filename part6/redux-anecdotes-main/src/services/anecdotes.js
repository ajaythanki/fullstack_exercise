import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};
const update = async (obj) => {
  const { id, ...fildsToUpdate } = obj;
  console.log(id,fildsToUpdate);
  const response = await axios.put(`${baseUrl}/${id}`, fildsToUpdate);
  return response.data;
};
export default { getAll, createNew, update };
