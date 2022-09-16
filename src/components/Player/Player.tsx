import "./Player.css";

import {
  faArrowLeft,
  faArrowRight,
  faCaretLeft,
  faCaretRight,
  faMicrophoneLines,
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeLow,
  faVolumeMute,
  faVolumeOff,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PlayerTrack } from "./PlayerTrack";
import { useAppSelector } from "../../app/hooks";
import { useLocation, useNavigate } from "react-router-dom";

const Player = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const playingTrack = useAppSelector((state) => state.dashboard.currTrack);
  const path = location.pathname;
  return (
    <div className="player-container">
      <div className="player">
        <div className="playing-track-container">
          {playingTrack ? (
            <PlayerTrack
              key={playingTrack.uri}
              track={playingTrack}
              chooseTrack={() => {
                console.log("clicked");
              }}
            />
          ) : (
            <div></div>
          )}
        </div>
        <div className="player-controls-container">
          <div className="player-icon">
            <FontAwesomeIcon
              icon={faPlay}
              onClick={() => {
                console.log("play: ", playingTrack);
              }}
            />
          </div>
        </div>
        <div className="volume-container">
          <FontAwesomeIcon
            icon={faMicrophoneLines}
            color={`${path === "/lyrics" ? "green" : ""}`}
            onClick={() => {
              if (path === "/lyrics") {
                navigate(-1);
              } else {
                navigate("/lyrics");
              }
            }}
          />
          <FontAwesomeIcon icon={faVolumeOff} />
          {/* <FontAwesomeIcon icon={faVolumeLow} />
        <FontAwesomeIcon icon={faVolumeHigh} />
        <FontAwesomeIcon icon={faVolumeMute} /> */}

          <input
            className="volume"
            type="range"
            id="vol"
            name="vol"
            min="0"
            max="100"
            //   style={{ webkit: "#578211" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
