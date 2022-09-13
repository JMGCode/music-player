import "./index.css";

import { PropsWithChildren } from "react";

const Content: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <div className="content">{children}</div>;
};

export default Content;
