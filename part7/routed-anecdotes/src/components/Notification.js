import React from "react";

const Notification = ({ message, msgType }) => {
  const style = {
    display: !message ? "none" : "",
    padding: "10px",
    backgroundColor: msgType === "Success" ? "#23C552" : "#F84F31",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "10px",
    width: "fit-content",
    textAlign: "center",
    margin: "0 auto",
    animation: "fadeIn 1s",
  };
  return <div style={style}>{message}</div>;
};

export default Notification;
