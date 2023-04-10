import { PropTypes } from "prop-types";
import { useState } from "react";
const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    handleCreateBlog({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title :{" "}
        <input
          type="text"
          name="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          id="blog-title-input"
        />
      </div>
      <div>
        author :{" "}
        <input
          type="text"
          name="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          id="blog-author-input"
        />
      </div>
      <div>
        url :{" "}
        <input
          type="text"
          name="Url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          id="blog-url-input"
        />
      </div>
      <button id="btnCreate" type="submit">Create</button>
    </form>
  );
};

BlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
};

export default BlogForm;
