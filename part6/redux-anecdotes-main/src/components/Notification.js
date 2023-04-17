import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.message);

  const style = !notification ? { visibility: "hidden" } : {
    visibility: "visible",
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification}</div>;
};

export default Notification;
