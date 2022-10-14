import { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import {
  LeftCircleArrowIcon,
  RightCircleArrowIcon,
} from "../../components/Icons";
import "./Header.css";

interface IProps {}
const Header: FC<PropsWithChildren<IProps>> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="header-container">
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
