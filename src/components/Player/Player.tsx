import "./Player.css";

import {
  ConnectIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  RepeatIcon,
  VolumeIcon,
} from "../Icons";
import {
  ControlType,
  useControlPlayerMutation,
  useGetPlayerStateQuery,
  useRepeatPlayedTrackMutation,
  useSetPlayerVolumeMutation,
  useToggleShufflePlayerMutation,
  useTransferPlayerMutation,
} from "../../features/api/spotify";
import { useLocation, useNavigate } from "react-router-dom";

import { ConnectMenu } from "../ConnectDevice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PlayerTrack } from "./PlayerTrack";
import ShuffleIcon from "../Icons/ShuffleIcon";
import SpotifyIcon from "../Icons/SpotifyIcon";
import { faMicrophoneLines } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../app/hooks";
import useSpotifySdk from "../../hooks/useSpotifySdk";
import { useState } from "react";
import useThrottle from "../../hooks/useThrottle";

const Player = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const player = useSpotifySdk();

  //=======Mutations==========
  const [repeatMutation] = useRepeatPlayedTrackMutation();
  const [shuffleMutation] = useToggleShufflePlayerMutation();
  const [transferMutation] = useTransferPlayerMutation();
  const [volumeMutation] = useSetPlayerVolumeMutation();
  const [controlMutation] = useControlPlayerMutation();
  const { data: ppdata, refetch } = useGetPlayerStateQuery();

  const {
    isPaused,
    loopState,
    shuffleState,
    currTrack: playingTrack,
  } = useAppSelector((state) => state.dashboard);

  const deviceId = useAppSelector((state) => state.auth.deviceId);
  const [volume, setVolume] = useState(50);

  const throttle = useThrottle();

  const handleVolumeChange = ({ deviceId, volume }: any) => {
    if (!deviceId) return;
    volumeMutation({ deviceId, volume });
    setVolume(volume);
  };

  const handleControlAction = (action: ControlType) => {
    if (!deviceId) return;

    controlMutation({ deviceId, action })
      .unwrap()
      .then((fulfilled: any) => console.log("action fulfulled"))
      .catch(async ({ data, status }) => {
        console.log(`action failed ${action}: `, data);
        if (status === 404) {
          await player.disconnect();
          await player.connect();
          setTimeout(async () => {
            await transferMutation({ deviceId, play: false });

            controlMutation({ deviceId, action })
              .unwrap()
              .catch(() => {
                console.log("action failed a second time go back to login");
              });
          }, 1500);
        }
      });
  };

  return (
    <div className="player-container">
      <div className="player">
        <div className="playing-track-container">
          <PlayerTrack
            key={playingTrack?.uri}
            track={playingTrack}
            chooseTrack={() => {
              console.log("clicked");
            }}
          />
        </div>
        <div className="player-controls-container">
          <div className="player-icon">
            <ShuffleIcon
              size="20"
              color={shuffleState ? "#56bd40" : "rgba(255,255,255,0.2)"}
              onClick={() => {
                shuffleMutation({ deviceId, state: !shuffleState });
              }}
            />
            <PrevIcon
              size="20"
              onClick={() => {
                handleControlAction("previous");
              }}
            />
            {!isPaused ? (
              <PauseIcon
                onClick={() => {
                  handleControlAction("pause");
                }}
              />
            ) : (
              <PlayIcon
                onClick={async () => {
                  handleControlAction("play");
                  // }
                }}
              />
            )}

            <NextIcon
              size="20"
              onClick={() => {
                handleControlAction("next");
              }}
            />

            <RepeatIcon
              type={loopState.type}
              size="24"
              color={
                loopState.type !== "off" ? "#56bd40" : "rgba(255,255,255,0.2)"
              }
              onClick={() => {
                const values = ["off", "context", "track"];
                const nextMode = (loopState.id + 1) % 3;
                const state = values[nextMode];
                repeatMutation({ deviceId, state });
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

          <ConnectMenu />
          <VolumeIcon size="40" value={volume} />

          <input
            className="volume"
            type="range"
            id="vol"
            name="vol"
            min="0"
            max="100"
            onChange={(e) =>
              throttle(handleVolumeChange, 300, {
                deviceId,
                volume: Number(e.target.value),
              })
            }
          />
        </div>
        <div
          style={{
            backgroundColor: "#56bd40",
            gridColumn: "span 3",
            display: "flex",
            justifyContent: "end",
            padding: "4px 100px 4px 4px",
            color: "black",
            alignItems: "center",
            gap: "5px",
            lineHeight: "22px",
          }}
        >
          <SpotifyIcon id="spotify-bottom-bar" color="black" size="20" />{" "}
          Listening on JMGCode's PC
        </div>
      </div>
    </div>
  );
};

export default Player;
