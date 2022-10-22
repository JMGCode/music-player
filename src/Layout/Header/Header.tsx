import "./Header.css";

import { FC, PropsWithChildren, useEffect, useState } from "react";
import {
  DropDownArrow,
  LeftCircleArrowIcon,
  RightCircleArrowIcon,
} from "../../components/Icons";

import { useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../../features/api/spotify/me";
import { useAppDispatch } from "../../app/hooks";
import { clearCredentials } from "../../features/auth/authSlice";

interface IProps {
  styles?: any;
}

interface IUserMenuItemProps {
  title: string;
  onClick?: () => void;
}
const UserMenuItem: FC<IUserMenuItemProps> = ({ title }) => {
  return <div className="header-user-menu-item">{title}</div>;
};
const ExtraUserMenuItem: FC<IUserMenuItemProps> = ({ title, onClick }) => {
  return (
    <div className="header-user-menu-extra-item" onClick={onClick}>
      {title}
    </div>
  );
};

const menuItems = [
  {
    title: "Account",
  },
  {
    title: "Profile",
  },
  {
    title: "Private session",
  },
  {
    title: "Settings",
  },
];

const Header: FC<PropsWithChildren<IProps>> = ({ children, styles }) => {
  const navigate = useNavigate();
  const { container } = styles || {};
  const { data: user } = useGetMeQuery();
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();

  const extraMenuItems = [
    {
      title: "Logout",
      onClick: () => {
        dispatch(clearCredentials());
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 400);
      },
    },
  ];

  useEffect(() => {
    if (isClosing) {
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 250);
      return () => clearTimeout(timeoutId);
    }
  }, [isClosing]);

  return (
    <div className="header-container" style={{ ...container }}>
      <div className="header-navigation-container">
        <LeftCircleArrowIcon onClick={() => navigate(-1)} />
        <RightCircleArrowIcon onClick={() => navigate(1)} />
      </div>
      <div style={{ flex: 1 }}>{children}</div>
      <div
        className="header-menu"
        onClick={() => {
          if (isVisible) {
            setIsClosing(true);
          } else {
            setIsVisible(true);
            setIsClosing(false);
          }
        }}
      >
        <img className="user-img" src={user?.images[0].url} alt="profile_img" />
        <span className="user-name">{user?.display_name}</span>
        <div
          style={{
            height: "100%",
            paddingTop: "4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <DropDownArrow size="20" />
        </div>
        <div
          className="header-user-menu"
          style={{
            animation: `${
              isClosing ? " eett ease-in-out 300ms" : " ttee ease-in-out 300ms"
            }`,
            display: `${isVisible ? "" : "none"}`,
          }}
        >
          <div>
            {menuItems.map((item) => (
              <UserMenuItem key={`user-menu-item${item.title}`} {...item} />
            ))}
          </div>
          <hr />
          <div>
            {extraMenuItems.map((item) => {
              return (
                <ExtraUserMenuItem
                  key={`user-menu-extra-item${item.title}`}
                  {...item}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
