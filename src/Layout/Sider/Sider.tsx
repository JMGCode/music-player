import "./Sider.css";

import React, { PropsWithChildren } from "react";

import { useSider } from "../../SliderContext";

const Sider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const siderState = useSider();
  return (
    <div
      className="sider"
      style={
        {
          "--sider-width": siderState ? "225px" : "0px",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};

export default Sider;
