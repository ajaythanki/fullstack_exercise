import { Link } from "react-router-dom";

const Menu = () => {
  const style = {
    paddingRight: 10,
    color:"#000"
  };
  return (
    <div>
      <Link style={style} to={"/"}>Anecdotes</Link>
      <Link style={style} to={"/create"}>Create New</Link>
      <Link style={style} to={"/about"}>About</Link>
    </div>
  );
};

export default Menu;