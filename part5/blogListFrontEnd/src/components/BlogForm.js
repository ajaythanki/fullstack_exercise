const BlogForm = ({
  handleCreateBlog,
  title,
  author,
  url,
  handleTitle,
  handleAuthor,
  handleUrl
}) => {
  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        title :{" "}
        <input
          type="text"
          name="Title"
          value={title}
          onChange={(e) => handleTitle(e)}
        />
      </div>
      <div>
        author :{" "}
        <input
          type="text"
          name="Author"
          value={author}
          onChange={(e) => handleAuthor(e)}
        />
      </div>
      <div>
        url :{" "}
        <input
          type="text"
          name="Url"
          value={url}
          onChange={(e) => handleUrl(e)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;