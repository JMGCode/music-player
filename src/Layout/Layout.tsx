import "./Layout.css";

import { PropsWithChildren, useState } from "react";

import useSpotifySdk from "../hooks/useSpotifySdk";

const Layout: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const player = useSpotifySdk();
  const [userInteraction, setUserInteraction] = useState(false);
  return (
    <div
      className="layout"
      onTouchStart={() => {
        if (!userInteraction) {
          console.info("<<<<<<<<user interacted with the screen>>>>>>>>>>");
          setUserInteraction(true);
          player.connect();
        }
      }}
    >
      {children}
    </div>
  );
};

export default Layout;
