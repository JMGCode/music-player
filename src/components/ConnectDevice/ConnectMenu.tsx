import "./ConnectDevice.css";

import { ConnectIcon } from "../Icons";
import ConnectItem from "./ConnectItem";
import { useGetDevicesQuery } from "../../features/api/spotify";
import { useState } from "react";

const ConnectMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, refetch } = useGetDevicesQuery();

  return (
    <div className="connect-button">
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
              onSelect={() => setIsOpen(false)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ConnectMenu;
