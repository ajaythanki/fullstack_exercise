import { useNotificationValue } from "../NotificationContext";

const Notification = () => {

  const notification = useNotificationValue();
  console.log(notification);
  const style = !notification
    ? {
        visibility: "hidden",
      }
    : {
        border: "solid",
        padding: 10,
        borderWidth: 1,
        marginBottom: 5,
      };

  // if (true) return null;

  return <div style={style}>{notification}</div>;
};

export default Notification;

