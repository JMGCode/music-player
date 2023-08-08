import "./Player.css";

import {
  ControlType,
  useControlPlayerMutation,
  useGetDevicesQuery,
  useRepeatPlayedTrackMutation,
  useSeekPositionMutation,
  useSetPlayerVolumeMutation,
  useToggleShufflePlayerMutation,
  useTransferPlayerMutation,
} from "../../features/api/spotify";
import {
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  RepeatIcon,
  VolumeIcon,
} from "../Icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePlayer, usePlayerUpdate } from "../../PlayerContext";

import { ConnectMenu } from "../ConnectDevice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InfoNoPremium } from "../../Notifications";
import { PlayerTrack } from "./PlayerTrack";
import { RangeControl } from "./RangeControl";
import ShuffleIcon from "../Icons/ShuffleIcon";
import SpotifyIcon from "../Icons/SpotifyIcon";
import { faMicrophoneLines } from "@fortawesome/free-solid-svg-icons";
import { getTimeString } from "../../helpers/getTimeString";
import { info as infoNotification } from "../Notification/Notify";
import { useAppSelector } from "../../app/hooks";
import useSpotifySdk from "../../hooks/useSpotifySdk";
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
  const [seekMutation] = useSeekPositionMutation();

  const {
    isPaused,
    loopState,
    shuffleState,
    trackDuration,
    trackPosition,
    currTrack: playingTrack,
  } = useAppSelector((state) => state.dashboard);

  const { data, refetch } = useGetDevicesQuery();
  const deviceId = useAppSelector((state) => state.auth.deviceId);
  const [volume, setVolume] = useState(50);
  const [isDeviceActive, setIsDeviceActive] = useState(false);
  const playerMobileState = usePlayer();
  const tooglePlayerMobileState = usePlayerUpdate();

  const [elapsedTrackTime, setElapsedTrackTime] = useState(0);
  const trackIntervalRef = useRef<NodeJS.Timer>();
  const [isDraggingPosition, setIsDraggingPosition] = useState(false);

  useEffect(() => {
    setElapsedTrackTime(trackPosition / 1000);
    if (!isPaused) {
      const interval = setInterval(handlePositionInterval, 1000);
      trackIntervalRef.current = interval;
    }
    return () =>
      trackIntervalRef.current && clearInterval(trackIntervalRef.current);
  }, [trackDuration, trackPosition]);

  const handlePositionInterval = () => {
    setElapsedTrackTime((prev) => {
      const time = (prev += 1);
      if (time >= trackDuration / 1000 && trackIntervalRef.current) {
        clearInterval(trackIntervalRef.current);
      }
      return time;
    });
  };

  const handleVolumeChange = useCallback(
    ({ deviceId, volume }: any) => {
      const roundVolume = Math.floor(volume);
      console.log(deviceId, player);
      if (!deviceId) return;
      if (!player) return;
      // volumeMutation({ deviceId, volume: roundVolume });
      player.setVolume(roundVolume / 100).catch((e: any) => console.log(e));
      setVolume(roundVolume);
    },
    [player]
  );

  useEffect(() => {
    const activeDevice = data?.devices.find((device) => device.is_active);
    console.log(
      "useEffect",
      activeDevice?.id,
      deviceId,
      activeDevice?.id === deviceId
    );
    if (activeDevice?.id === deviceId) {
      setIsDeviceActive(true);
    }
  }, [data, deviceId]);

  //TODO: get currDevice(Api) if not deviceSelected
  //send curr deviceId if no device Id send notification error
  //no device found
  const handleControlAction = (action: ControlType) => {
    if (!deviceId) {
      infoNotification(<InfoNoPremium />, true);
      return;
    }

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

  const handleTrackPositionChange = (value: number) => {
    console.log("trackPosition", value);
    const percPos = Math.floor(value);
    const posMs = (percPos * (trackDuration / 1000)) / 100;
    setElapsedTrackTime(posMs);
  };

  return (
    <div
      className={`player-container ${isDeviceActive ? "active-player" : ""}`}
    >
      <div
        onClick={tooglePlayerMobileState}
        className="player-close-btn"
        style={{ paddingTop: `${playerMobileState ? "0px" : "5px"}` }}
      >
        {playerMobileState ? "x" : "^"}
      </div>
      <div className="player">
        <div className={`playing-track-container `}>
          <PlayerTrack
            key={playingTrack?.uri}
            track={playingTrack}
            chooseTrack={() => {
              console.log("clicked");
            }}
          />
        </div>
        <div
          className={`player-controls-container ${
            playerMobileState ? "" : "player-hidden"
          }`}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              flex: "1 0 auto",
              minWidth: "200px",
              maxWidth: "500px",
            }}
          >
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
                    trackIntervalRef.current &&
                      clearInterval(trackIntervalRef.current);
                    console.log(
                      "clear track interval",
                      trackIntervalRef.current
                    );
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
            <div className="track-control-container">
              <p>{getTimeString(elapsedTrackTime)}</p>
              <div style={{ flex: 1 }}>
                <RangeControl
                  onChange={handleTrackPositionChange}
                  // value={Math.floor((elapsedTrackTime * 100) / 90)}
                  onStart={() => {
                    setIsDraggingPosition(true);
                    trackIntervalRef.current &&
                      clearInterval(trackIntervalRef.current);
                  }}
                  onEnd={() => {
                    if (isDraggingPosition) {
                      setIsDraggingPosition(false);
                      trackIntervalRef.current &&
                        clearInterval(trackIntervalRef.current);

                      seekMutation({
                        position: Math.floor(elapsedTrackTime * 1000),
                        deviceId,
                      });
                    }
                  }}
                  value={Math.floor(
                    (elapsedTrackTime * 100) / (trackDuration / 1000)
                  )}
                />
              </div>
              <p>{getTimeString(trackDuration / 1000)}</p>
            </div>
          </div>
        </div>
        <div
          className={`volume-container ${
            playerMobileState ? "" : "controls-hidden"
          }`}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <FontAwesomeIcon
              className="lyrics-btn"
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

            <ConnectMenu
              onClose={() => {
                setTimeout(() => {
                  refetch();
                }, 1000);
              }}
            />
          </div>
          <div className="volume-control">
            <VolumeIcon size="26" value={volume} />
            <RangeControl
              width={"100px"}
              onChange={(volume: number) =>
                handleVolumeChange({ volume, deviceId })
              }
              value={volume}
            />
          </div>
        </div>
        {/* {isDeviceActive && (
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
        )} */}
      </div>
    </div>
  );
};

export default Player;
