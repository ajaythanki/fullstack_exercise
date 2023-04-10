import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs";
// const baseUrl = "https://bloglist.akthanki.repl.co/api/blogs";
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
const updateBlog = async ({ id, ...blogObj }) => {
  const response = await axios.put(`${baseUrl}/${id}`, blogObj, {
    headers: { Authorization: token },
  });
  return response.data;
};
const deleteBlog = async (blogId) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, {
    headers: { Authorization: token },
  });
  return response.status;
};

export default { getAll, createBlog, updateBlog, deleteBlog, setToken };
