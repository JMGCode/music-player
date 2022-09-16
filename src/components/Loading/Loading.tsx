import "./Loading.css";

import { PropsWithChildren } from "react";

const Loading: React.FC<PropsWithChildren<{ isLoading: boolean }>> = ({
  children,
  isLoading,
}) => {
  return isLoading ? (
    <div className="loader-container">
      <div className="loader">
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <span>Loading...</span>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};

export default Loading;
