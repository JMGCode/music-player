import "./ContentContainer.css";

import React, { PropsWithChildren } from "react";

const ContentContainer: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <div className="content-container content-container__scroll">
      {children}
    </div>
  );
};

export default ContentContainer;
