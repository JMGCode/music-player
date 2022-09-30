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

  const repeat = async (callback: any, times: number, delay: number = 500) => {
    let _times = times;
    while (_times > 0) {
      try {
        await callback().unwrap();
        break;
      } catch (e) {
        console.log("repeat - error:", e);
      }

      await new Promise<void>((resolve) =>
        setTimeout(() => {
          resolve();
        }, delay)
      );
      _times -= 1;
    }
  };

  const handleControlAction = (action: ControlType) => {
    if (!deviceId) return;
    controlMutation({ deviceId, action })
      .unwrap()
      .then((fulfilled: any) => console.log("action fulfulled"))
      .catch(async ({ data, status }) => {
        console.log("action failed", data);
        if (status === 404) {
          await player.disconnect();
          await player.connect();
          setTimeout(async () => {
            await transferMutation({ deviceId, play: false });
            repeat(() => controlMutation({ deviceId, action }), 5, 1000);
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
                // if (!deviceId) return;
                // controlMutation({ deviceId, action: "previous" });
              }}
            />
            {!isPaused ? (
              <PauseIcon
                onClick={() => {
                  handleControlAction("pause");
                  // if (!deviceId) return;
                  // controlMutation({ deviceId, action: "pause" });
                }}
              />
            ) : (
              <PlayIcon
                onClick={async () => {
                  if (!deviceId) return;
                  if (ppdata?.device?.id !== deviceId) {
                    await transferMutation({ deviceId });
                    setTimeout(() => {
                      refetch();
                    }, 5000);
                  } else {
                    // controlMutation({ deviceId, action: "play" });
                    handleControlAction("play");
                  }
                }}
              />
            )}

            <NextIcon
              size="20"
              onClick={() => {
                handleControlAction("next");
                // if (!deviceId) return;
                // controlMutation({ deviceId, action: "next" });
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
            //   style={{ webkit: "#578211" }}
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
