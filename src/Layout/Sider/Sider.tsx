import "./Sider.css";

import { PropsWithChildren } from "react";

const Sider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <div className="sider ">{children}</div>;
};

export default Sider;
