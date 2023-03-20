import { FC } from "react";
import "./Section.css";
interface Props {
  children: React.ReactNode;
  title?: string;
}
const Section: FC<Props> = ({ title, children }) => {
  return (
    <div className="section-container">
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
};

export default Section;
