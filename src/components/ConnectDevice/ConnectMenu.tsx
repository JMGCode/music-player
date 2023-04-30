import "./ConnectDevice.css";

import { FC, useEffect, useState } from "react";

import { ConnectIcon } from "../Icons";
import ConnectItem from "./ConnectItem";
import { useAppSelector } from "../../app/hooks";
import { useGetDevicesQuery } from "../../features/api/spotify";

interface Props {
  onClose?: any;
}
const ConnectMenu: FC<Props> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, refetch } = useGetDevicesQuery();
  const deviceId = useAppSelector((state) => state.auth.deviceId);
  // const [isDeviceActive, setIsDeviceActive] = useState(false);

  // useEffect(() => {
  //   const activeDevice = data?.devices.find((device) => device.is_active);
  //   if (activeDevice?.id === deviceId) {
  //     setIsDeviceActive(true);
  //   }
  // }, [data]);

  return (
    <div
      className={`connect-button`}
      // className={`connect-button ${
      //   isDeviceActive ? "connect-button-active" : ""
      // }`}
    >
      <ConnectIcon
        size="20"
        onClick={() => {
          if (!isOpen) {
            refetch();
          }
          setIsOpen((prev) => !prev);
        }}
      />
      <div className={`connect-menu ${isOpen ? "open" : ""}`}>
        <h3
          style={{ paddingBottom: "15px", paddingTop: "15px", color: "white" }}
        >
          Connect to a device
        </h3>
        {data?.devices.map((device) => {
          return (
            <ConnectItem
              key={device.id}
              id={device.id}
              name={device.name}
              type={device.type}
              isActive={device.is_active}
              onSelect={() => {
                setIsOpen(false);
                onClose();
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ConnectMenu;
