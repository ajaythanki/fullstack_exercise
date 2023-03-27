/*
Exercises 5.1.-5.4.
5.1: bloglist frontend, step1
5.2: bloglist frontend, step2
5.3: bloglist frontend, step3
5.4: bloglist frontend, step4

*/
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notificationMessage, setNotificationMessage] = useState({});

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    let loggedInUser = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showNotification = (msg, msgType = "error") => {
    setNotificationMessage({ message: msg, messageType: msgType });

    setTimeout(() => {
      setNotificationMessage({});
    }, 3500);
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };
    try {
      const res = await blogService.createBlog(newBlog);
      if (res) {
        setTitle("");
        setAuthor("");
        setUrl("");
        setBlogs(blogs.concat(newBlog));
        showNotification(`${title} by ${author} added`, "success");
      } else {
        showNotification("Something went wrong...");
      }
    } catch (error) {
      showNotification(error.response.data.error);
    }
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleAuthor = (e) => {
    setAuthor(e.target.value);
  };
  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      showNotification(`Logged in successfuly`, "success");
    } catch (error) {
      showNotification(error.response.data.error);
    }
  };
  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogAppUser");
    showNotification("Successfully logged out", "Success");
    setUser("");
  };
  return (
    <div>
      {notificationMessage && (
        <Notification
          message={notificationMessage.message}
          messageType={notificationMessage.messageType}
        />
      )}
      <h2>Blogs</h2>
      {!user && (
        <div>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            handleUsername={handleUsername}
            handlePassword={handlePassword}
          />
        </div>
      )}
      {user && (
        <div>
          <p>
            {user.name} logged in{" "}
            <button onClick={handleLogout}>Log out</button>
          </p>

          <h2>Create New</h2>
          <div>
            <BlogForm
              handleCreateBlog={handleCreateBlog}
              title={title}
              author={author}
              url={url}
              handleTitle={handleTitle}
              handleAuthor={handleAuthor}
              handleUrl={handleUrl}
            />
          </div>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
