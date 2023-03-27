import axios from "axios";
const baseUrl = "https://bloglist.akthanki.repl.co/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const createBlog = async (blogObj) => {
  const response = await axios.post(baseUrl, blogObj, {
    headers: { Authorization: token },
  });
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createBlog, setToken };
