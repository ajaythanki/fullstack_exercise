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
      <div className="blog" style={{ display: "inline-block" }}>
        <span>
          <strong className="blog-title">{blog.title}</strong>
        </span>
        <Togglable buttonVisibleLable={"view"} buttonHideLable={"hide"}>
          <div className="blog-content">
            <p>{blog.url}</p>
            <p>
              <span className="blog-likes">{blog.likes}</span> <button id="btnLike" onClick={handleLike}>like</button>
            </p>
            <p className="author-name">{blog.author}</p>
            {blog.user.username === user.username && (
              <button
                onClick={handleDelete}
                style={{ backgroundColor: "blue", color: "white" }}
                id="btnDelete"
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
