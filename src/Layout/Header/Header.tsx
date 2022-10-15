import "./Header.css";

import { FC, PropsWithChildren } from "react";
import {
  LeftCircleArrowIcon,
  RightCircleArrowIcon,
} from "../../components/Icons";

import { useNavigate } from "react-router-dom";

interface IProps {
  styles?: any;
}
const Header: FC<PropsWithChildren<IProps>> = ({ children, styles }) => {
  const navigate = useNavigate();
  const { container } = styles || {};
  return (
    <div className="header-container" style={{ ...container }}>
      <div className="header-navigation-container">
        <LeftCircleArrowIcon onClick={() => navigate(-1)} />
        <RightCircleArrowIcon onClick={() => navigate(1)} />
      </div>
      <div>{children}</div>
      <div className="header-menu"></div>
    </div>
  );
};

export default Header;
