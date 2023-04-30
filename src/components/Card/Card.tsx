import "./Card.css";

import { FC, PropsWithChildren } from "react";

interface IProps {
  height?: string;
  width?: string;
  borderRadius?: string;
  padding?: string;
  onClick?: () => void;
}
const Card: FC<PropsWithChildren<IProps>> = ({
  children,
  onClick,
  ...props
}) => {
  return (
    <article className="card-container" onClick={onClick} style={{ ...props }}>
      {children}
    </article>
  );
};

export default Card;
