import "./Content.css";

import { PropsWithChildren } from "react";

const Content: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <div className="content scrollable">{children}</div>;
};

export default Content;
