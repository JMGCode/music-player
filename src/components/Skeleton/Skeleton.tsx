import "./Skeleton.css";

import { FC } from "react";

interface IProps {
  style?: React.CSSProperties;
}
const Skeleton: FC<IProps> = ({ style }) => {
  return <div className="skeleton" style={style}></div>;
};
export default Skeleton;
