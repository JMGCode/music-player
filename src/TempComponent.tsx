import {
  faBookOpen,
  faHome,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TempComponent = ({ location, setLocation }: any) => {
  return (
    <div className="menu">
      <div className="menu__item">
        <FontAwesomeIcon icon={faHome} className="menu__item__icon" /> Home
      </div>
      <div
        className="menu__item"
        onClick={() => {
          if (location.curr !== "search") {
            setLocation({ prev: location.curr, curr: "search" });
          }
        }}
      >
        <FontAwesomeIcon icon={faSearch} className="menu__item__icon" /> Search
      </div>
      <div className="menu__item">
        <FontAwesomeIcon icon={faBookOpen} className="menu__item__icon" /> Your
        Library
      </div>
      <hr></hr>
    </div>
  );
};

export default TempComponent;