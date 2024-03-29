import { PropTypes } from "prop-types";
import { useState } from "react";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = handleLogin({ username, password });
    if (token) {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username :{" "}
        <input
          type="text"
          name="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          id="username"
        />
      </div>
      <div>
        password :{" "}
        <input
          type="password"
          name="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          id="password"
        />
      </div>
      <button type="submit" id="btnLogin">Login</button>
    </form>
  );
};
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};
export default LoginForm;