const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsername,
  handlePassword,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={(event) => handleUsername(event)}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={(event) => handlePassword(event)}
      />
    </div>
    <button type="submit">login</button>
  </form>
);

export default LoginForm;
