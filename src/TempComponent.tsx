import {
  HouseIcon,
  LibraryIcon,
  LogoIcon,
  SearchIcon,
} from "./components/Icons";
import { useLocation, useNavigate } from "react-router-dom";

const TempComponent = () => {
  let navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="menu">
      <div style={{ padding: "5px 0 15px 5px" }}>
        <LogoIcon size="100" />
      </div>

      <div
        className="menu__item"
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="menu__item__icon ">
          <HouseIcon size="18" isSelected={location.pathname === "/"} />
        </div>
        Home
      </div>
      <div
        className="menu__item"
        onClick={() => {
          navigate("/search");
        }}
      >
        <div className="menu__item__icon ">
          <SearchIcon
            size="18"
            isSelected={location.pathname.includes("search")}
          />
        </div>
        Search
      </div>
      <div
        className="menu__item"
        onClick={() => {
          navigate("/collection/playlist");
        }}
      >
        <div className="menu__item__icon ">
          <LibraryIcon
            size="18"
            isSelected={location.pathname.includes("library")}
          />
        </div>
        Your Library
      </div>
      <hr></hr>
    </div>
  );
};

export default TempComponent;
