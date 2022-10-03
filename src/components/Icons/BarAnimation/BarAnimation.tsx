import "./BarAnimation.css";

import { FC } from "react";

interface IProps {
  size: number | string;
  color: string;
}

const BarAnimation: FC<IProps> = ({ size, color = "white" }) => {
  return (
    <div
      className="bar-container"
      style={{
        width: size,
        height: size,
      }}
    >
      <div className="bar" style={{ backgroundColor: color }}></div>
      <div className="bar" style={{ backgroundColor: color }}></div>
      <div className="bar" style={{ backgroundColor: color }}></div>
      <div className="bar" style={{ backgroundColor: color }}></div>
      <div className="bar" style={{ backgroundColor: color }}></div>
    </div>
  );
};

export default BarAnimation;
