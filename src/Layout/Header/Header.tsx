import "./Header.css";

import {
  DropDownArrow,
  LeftCircleArrowIcon,
  RightCircleArrowIcon,
} from "../../components/Icons";
import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import { useSider, useSiderUpdate } from "../../SliderContext";

import Skeleton from "../../components/Skeleton/Skeleton";
import { clearCredentials } from "../../features/auth/authSlice";
import { getRandColorFromStr } from "../../helpers/getRandColorFromStr";
import { useAppDispatch } from "../../app/hooks";
// import useBreakpoint from "../../hooks/useBreakpoint";
import { useGetMeQuery } from "../../features/api/spotify/me";
import { useNavigate } from "react-router-dom";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

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
  const { data: user, isLoading } = useGetMeQuery();
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [userColor, setUserColor] = useState({ rgb: "rgb(0,0,0)", hsl: "" });
  const dispatch = useAppDispatch();
  const userMenuRef = useRef(null);
  // const breakpoint = useBreakpoint();

  const toogleSider = useSiderUpdate();
  const siderState = useSider();

  useOutsideAlerter(userMenuRef, () => {
    if (!isVisible) {
      setIsClosing(true);
    }
  });

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

  useEffect(() => {
    if (!user) return;
    const { red, green, blue, h } = getRandColorFromStr(user?.display_name);
    // getRandColorFromStrs(user?.display_name, { min: 359, max: 2 });
    setUserColor({
      rgb: `rgb(${red},${green},${blue})`,
      hsl: `hsl(${h},100%,50%)`,
    });
  }, [user]);
  return (
    <div className="header-container" style={{ ...container }}>
      <div className="header-navigation-container">
        <LeftCircleArrowIcon onClick={() => navigate(-1)} />
        <RightCircleArrowIcon onClick={() => navigate(1)} />
      </div>
      <div className="header-sider-btn">
        {siderState ? (
          <LeftCircleArrowIcon onClick={toogleSider} />
        ) : (
          <RightCircleArrowIcon onClick={toogleSider} />
        )}
      </div>

      <div style={{ flex: 1, overflow: "hidden" }}>{children}</div>
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
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            overflow: "hidden",
          }}
        >
          {isLoading ? (
            <Skeleton
              style={{
                height: "80%",
                width: "32px",
                flexShrink: "0",
                borderRadius: "50%",
              }}
            />
          ) : user?.images.length > 0 ? (
            <img
              className="user-img"
              src={user?.images[0].url}
              alt="profile_img"
            />
          ) : (
            <p
              style={{
                backgroundColor: userColor.hsl,
                borderRadius: "50%",
                height: "80%",
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              {user?.display_name[0]}
            </p>
          )}

          <span className="user-name">
            {isLoading ? (
              <Skeleton style={{ width: "30ch", height: "1rem" }} />
            ) : (
              user?.display_name
            )}
          </span>
        </div>
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
          ref={userMenuRef}
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
