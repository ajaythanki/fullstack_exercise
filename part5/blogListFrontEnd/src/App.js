/*
Exercises 5.1.-5.4.
5.1: bloglist frontend, step1
5.2: bloglist frontend, step2
5.3: bloglist frontend, step3
5.4: bloglist frontend, step4

Exercises 5.5.-5.11.
5.5 Blog list frontend, step5
5.6 Blog list frontend, step6
5.7 Blog list frontend, step7
5.8: Blog list frontend, step8
5.9: Blog list frontend, step9
5.10: Blog list frontend, step10
5.11: Blog list frontend, step11
*/
import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState("");

  const [notificationMessage, setNotificationMessage] = useState({});

  useEffect(() => {
    blogService.getAll().then((resBlogs) => {
      resBlogs.sort((a, b) => (a.likes < b.likes ? 1 : -1));
      setBlogs(resBlogs);
    });
  }, []);
  useEffect(() => {
    let loggedInUser = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const showNotification = (msg, msgType = "error") => {
    setNotificationMessage({ message: msg, messageType: msgType });

    setTimeout(() => {
      setNotificationMessage({});
    }, 3500);
  };

  const handleLike = async (blogObj) => {
    const { user, ...blogToUpdate } = blogObj;
    blogToUpdate.likes++;
    blogToUpdate.user = user.id;
    try {
      const updatedBlog = await blogService.updateBlog(blogToUpdate);
      const updatedBlogs = [...blogs];
  
      updatedBlogs.map((blog) => {
        if (blog.id === updatedBlog.id) blog.likes = updatedBlog.likes;
        return blog;
      });
  
      updatedBlogs.sort((a, b) => (a.likes < b.likes ? 1 : -1));
  
      setBlogs(updatedBlogs);
    } catch (error) {
      showNotification(error.response.data.error)
    }
  };
  const handleDelete = async (blogObj) => {
    const {id, title, author} = blogObj;

    if(window.confirm(`Remove ${title} by ${author}?`)){
      try {
        const res = await blogService.deleteBlog(id);
        if (res === 204) {
          const updatedBlogs = [...blogs].filter(
            (blog) => blog.id.toString() !== id.toString()
          );
          setBlogs(updatedBlogs);
        }else{
          showNotification("something went wrong...")
        }
      } catch (error) {
        showNotification(error.response.data.error)
      }
    }

  };
  const handleCreateBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    try {
      const res = await blogService.createBlog(newBlog);
      // console.log(res);
      if (res) {
        setBlogs(blogs.concat(res));
        showNotification(
          `${newBlog.title} by ${newBlog.author} added`,
          "success"
        );
      } else {
        showNotification("Something went wrong...");
      }
    } catch (error) {
      showNotification(error.response.data.error);
    }
  };
  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      showNotification(`Logged in successfuly`, "success");
      return user.token;
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
      <Notification
        message={notificationMessage.message}
        messageType={notificationMessage.messageType}
      />
      {!user && (
        <div>
          <LoginForm handleLogin={handleLogin} />
        </div>
      )}
      {user && (
        <div>
          <p>
            {user.name} logged in{" "}
            <button onClick={handleLogout}>Log out</button>
          </p>

          <Togglable
            buttonVisibleLable={"New Blog"}
            buttonHideLable={"cancel"}
            ref={blogFormRef}
          >
            <BlogForm handleCreateBlog={handleCreateBlog} />
          </Togglable>

          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={() => handleLike(blog)}
              handleDelete={() => handleDelete(blog)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;