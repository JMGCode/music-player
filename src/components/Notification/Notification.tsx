import "./Notification.css";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import createContainer from "./createContainer";
import {
  CrossIcon,
  ErrorCircle,
  InfoCircle,
  SuccessCircle,
  WarningCircle,
} from "../Icons";

const Colors = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
};
interface IProps {
  notificationType: string;
  onDelete: () => void;
  autoClose?: boolean;
  timeToClose?: number;
}
let timeToDelete = 600;

//TODO: change from predefined delete time to an amount after prev delete this only applies to automatic deletes not button deletes

const Notification: FC<PropsWithChildren<IProps>> = ({
  children,
  notificationType = "info",
  onDelete,
  autoClose = false,
  timeToClose = 2000,
}) => {
  const container = createContainer();
  const [isClosing, setIsClosing] = useState<boolean>(false);

  useEffect(() => {
    if (isClosing) {
      const timeoutId = setTimeout(onDelete, timeToDelete);
      return () => clearTimeout(timeoutId);
    }
  }, [isClosing, onDelete]);

  useEffect(() => {
    if (autoClose) {
      const timeoutId = setTimeout(() => setIsClosing(true), timeToClose);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [autoClose]);

  const getIcons: any = {
    info: <InfoCircle color="white" size="50px" backgroundColor="#2196f3" />,
    error: <ErrorCircle color="white" size="50px" backgroundColor="#f44336" />,
    warning: (
      <WarningCircle color="white" size="50px" backgroundColor="#ff9800" />
    ),
    success: (
      <SuccessCircle color="white" size="50px" backgroundColor="#4caf50" />
    ),
  };

  return createPortal(
    <div className={`container ${isClosing ? "shrink" : ""}`}>
      <div
        className={`notification-item-container ${notificationType} ${
          isClosing ? "slideOut" : "slideIn"
        }`}
      >
        <div className="notification-item-content-container">
          <div className="notification-item-close-btn">
            <CrossIcon size="10" onClick={() => setIsClosing(true)} />
          </div>
          <div className="notification-item-icon">
            {getIcons[notificationType]}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>,
    container
  );
};

export default Notification;
