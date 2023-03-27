const error = {
  color: "red",
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
};
const success = {
  color: "green",
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
};

const Notification = ({ message, messageType }) => {
  if (!message) {
    return null;
  }
  if (messageType === "error") return <div style={error}>{message}</div>;
  else return <div style={success}>{message}</div>;
};

export default Notification;
