const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsername,
  handlePassword,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username :{" "}
        <input
          type="text"
          name="Username"
          value={username}
          onChange={(e) => handleUsername(e)}
        />
      </div>
      <div>
        password :{" "}
        <input
          type="password"
          name="Password"
          value={password}
          onChange={(e) => handlePassword(e)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;