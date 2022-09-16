import "./Layout.css";

import { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <div className="layout">{children}</div>;
};

export default Layout;
