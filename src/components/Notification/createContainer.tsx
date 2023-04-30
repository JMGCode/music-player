import "./Notification.css";

const createContainer = () => {
  const portalId = "notificationContainer";
  let element = document.getElementById(portalId);

  if (element) return element;
  element = document.createElement("div");
  element.setAttribute("id", portalId);
  element.className = "notification-container";

  document.body.appendChild(element);
  return element;
};

export default createContainer;
