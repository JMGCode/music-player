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
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import SpotifyWebPlayer from "react-spotify-web-playback/lib";
import TrackSearchResult from "../TrackSearchResult";
import { useAuthContext } from "../hooks/useAuth";

const Player = ({
  trackUri,
  playingTrack,
  showLyrics,
  setShowLyrics,
}: {
  trackUri: any;
  playingTrack: any;
  showLyrics: boolean;
  setShowLyrics: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { accessToken } = useAuthContext();
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);
  if (!accessToken) return null;

  return (
    <div className="player-container">
      <div className="player">
        <div className="playing-track-container">
          {playingTrack ? (
            <TrackSearchResult
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
            color={`${showLyrics ? "green" : ""}`}
            onClick={() => {
              setShowLyrics((prev) => !prev);
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
