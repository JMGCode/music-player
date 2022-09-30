import { ConnectIcon } from "../Icons";
import { FC } from "react";
import SpotifyIcon from "../Icons/SpotifyIcon";
import { useTransferPlayerMutation } from "../../features/api/spotify";

interface IProps {
  id: string;
  name: string;
  type: string;
  isActive: boolean;
  onSelect: Function;
}

const ConnectItem: FC<IProps> = ({ id, name, type, isActive, onSelect }) => {
  const color = isActive ? "#56bd40" : "white";
  const [transferMutation] = useTransferPlayerMutation();
  return (
    <div
      className="connect-menu-item"
      onClick={() => {
        transferMutation({ deviceId: id });
        onSelect();
      }}
    >
      <ConnectIcon color={color} />
      <div className="connect-menu-item-info">
        <p style={{ fontSize: "1rem", margin: 0, color }}>
          {isActive ? "Listening On" : name}
        </p>
        <div className="connect-menu-item-info-text-container">
          <SpotifyIcon color={color} size="15" />
          <p style={{ marginBottom: "2px", fontSize: "0.8rem", color }}>
            {isActive ? name : "Spotify Connect"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectItem;
