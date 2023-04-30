import { FC } from "react";
import "./SectionList.css";
interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}
const SectionList: FC<Props> = ({ children, style }) => {
  return (
    <div className="section-list-container" style={style}>
      {children}
    </div>
  );
};

export default SectionList;
