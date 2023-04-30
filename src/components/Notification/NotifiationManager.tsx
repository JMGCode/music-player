import Notification from "./Notification";

import { FC, useEffect, useState } from "react";
import { getRandNumber } from "../../helpers/getRandNumber";

interface IProps {
  setNotify: any;
}

const NotificationsManager: FC<IProps> = ({ setNotify }) => {
  const [notifications, setNotifications] = useState<any[]>([]);

  type createNotificationType = {
    type: "info" | "warning" | "success" | "error";
    timeToClose?: number;
    autoClose?: boolean;
    children: any;
  };

  const createNotification = ({
    type = "info",
    timeToClose = 5000,
    autoClose = false,
    children,
  }: createNotificationType) => {
    setNotifications((prev) => {
      const currMillis = Number(new Date());
      let nTime = 0;
      const lastClosedNotification = prev?.slice(-1)[0]?.lastClosed || 0;

      if (currMillis < lastClosedNotification) {
        let diff = lastClosedNotification - currMillis;
        nTime = diff + 1500;
      } else {
        nTime = timeToClose;
      }

      const id = currMillis + "" + getRandNumber(1, 1000);
      return [
        ...prev,
        {
          notificationType: type,
          id,
          autoClose,
          timeToClose: nTime,
          lastClosed: currMillis + nTime,
          children,
        },
      ];
    });
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => {
      return prev.filter((e) => e.id !== id);
    });
  };

  useEffect(() => {
    setNotify(({ type, children, ...args }: any) => {
      return createNotification({ type, children, ...args });
    });
  }, [setNotify]);

  return (
    <>
      {notifications.map(({ id, notificationType, ...props }) => {
        return (
          <Notification
            key={id}
            notificationType={notificationType}
            onDelete={() => deleteNotification(id)}
            {...props}
          />
        );
      })}
    </>
  );
};
export default NotificationsManager;
