import Togglable from "./Togglable";
const Blog = ({ blog, handleLike, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  let user = window.localStorage.getItem("loggedBlogAppUser");
  user = JSON.parse(user);

  return (
    <div style={blogStyle}>
      <div style={{ display: "inline-block" }}>
        <span>
          <strong>{blog.title}</strong>
        </span>
        <Togglable buttonVisibleLable={"view"} buttonHideLable={"hide"}>
          <div>
            <p>{blog.url}</p>
            <p>
              {blog.likes} <button onClick={handleLike}>like</button>
            </p>
            <p>{blog.author}</p>
            {blog.user.username === user.username && (
              <button
                onClick={handleDelete}
                style={{ backgroundColor: "blue", color: "white" }}
              >
                remove
              </button>
            )}
          </div>
        </Togglable>
      </div>
    </div>
  );
};

export default Blog;
