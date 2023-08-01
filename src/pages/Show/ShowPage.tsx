import "./ShowPage.css";

import { getShortDate, getSmallestImage, getTimeFromSec } from "../../helpers";
import {
  useControlPlayerMutation,
  useGetEpisodesQuery,
  useGetShowQuery,
} from "../../features/api/spotify";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PlayerButton } from "../../components/PlayerButton";
import { ScrollHeader } from "../../Layout/Container/ScrollHeader";
import { ScrollHeaderContent } from "../../Layout/Container/ScrollHeader/ScrollHeader";
import { useAppSelector } from "../../app/hooks";

type EpisodeType = {
  description: string;
  duration_ms: number;
  is_playable: boolean;
  name: string;
  release_date: string;
  uri: string;
  images: SpotifyApi.ImageObject[];
  id: string;
};

const ShowPage = () => {
  const { showId = "" } = useParams();

  const { data: showData, isLoading } = useGetShowQuery(showId, {
    skip: showId === "",
  });

  const { data: episodesData, isLoading: isLoadingEpisodes } =
    useGetEpisodesQuery(showId, {
      skip: showId === "",
    });

  const podcastsContainerRef = useRef(null);
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        setColumns(() => {
          if (width < 880) return 1;
          return 2;
        });
      }
    });

    if (podcastsContainerRef.current) {
      resizeObserver.observe(podcastsContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const [showMore, setShowMore] = useState(false);
  const [longInfo, setLongInfo] = useState("");
  const [shortInfo, setShortInfo] = useState("");

  const getInfo = (text: string, min: number = 20, max: number = 30) => {
    const array = text.split(/(\s+|,|\.)/).filter((word) => word.trim() !== "");
    if (array.length <= min) return text;

    let pointIdx = null;

    for (let i = min; i < max; i++) {
      if (array[i] === ".") pointIdx = i + 1;
    }

    const shortArr = array.slice(0, pointIdx ? pointIdx : max);

    const short = shortArr.reduce((acc, curr) => {
      if (curr === "," || curr === ".") {
        return acc.slice(0, -1) + curr + " ";
      } else {
        return acc + curr + " ";
      }
    }, "");

    return short.trim();
  };

  useEffect(() => {
    if (showData == undefined) return;
    const description = showData?.description?.trim();
    const short = getInfo(description);
    setLongInfo(description);
    setShortInfo(short);
  }, [showData]);

  return (
    <>
      <ScrollHeader>
        <img
          src={showData?.images[0].url}
          alt=""
          className="playlist-header-img"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
          }}
        >
          <div>Podcast</div>
          <div className="playlist-name">{showData?.name}</div>
          <div className="podcast-publisher">{showData?.publisher}</div>
        </div>
      </ScrollHeader>
      <ScrollHeaderContent noPadding>
        <div
          className={`podcast-container ${columns === 2 ? "col-2" : ""}`}
          ref={podcastsContainerRef}
        >
          <div className="podcast-info">
            <h2 className="podcast-header">About</h2>
            <p className={`podcast-desc`}>{showMore ? longInfo : shortInfo}</p>
            {longInfo.length !== shortInfo.length && (
              <p
                className="podcast-show-more"
                onClick={() => setShowMore((prev) => !prev)}
              >
                {showMore ? "Show less" : "...Show more"}
              </p>
            )}
          </div>
          <div className="podcast-content">
            <LastEpisode episode={episodesData?.items[0]} />
            <div className="episodes-container">
              <h2 className="podcast-header">All episodes</h2>
              <div className="episode-list">
                {episodesData?.items.map(
                  (episode: EpisodeType, index: number) => (
                    <Episode
                      key={episode.uri}
                      episode={episode}
                      showUri={showData?.uri}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </ScrollHeaderContent>
    </>
  );
};

const Episode = ({
  episode,
  showUri,
}: {
  episode: EpisodeType;
  showUri: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();
  const [controlMutation] = useControlPlayerMutation();
  const handleNavigation = () => {
    navigate(`/episode/${episode.id}`);
  };

  const { isPaused, currTrack: playingTrack } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    if (isPaused) {
      setIsPlaying(false);
    } else {
      if (playingTrack?.name === episode.name) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
  }, [playingTrack]);

  const handleButtonClick = (e: any) => {
    e.stopPropagation();
    if (!isPlaying) {
      const isEpisodePlaying = playingTrack?.uri === episode.uri;
      let args = {};
      if (!isEpisodePlaying) {
        args = { context_uri: showUri, offset: { uri: episode.uri } };
      }
      controlMutation({
        deviceId: "",
        action: "play",
        args,
      });
    } else {
      controlMutation({
        deviceId: "",
        action: "pause",
      });
    }
  };

  if (!episode) return null;
  const img = getSmallestImage(episode.images);

  return (
    <div className="episode-wrapper" onClick={handleNavigation}>
      <div className="episode-item">
        <hr />
        <div className="episode-item-container">
          <img src={img.url} alt="" height={112} width={112} />
          <div className="episode-item-data">
            <h4 className={isPlaying ? "playing" : ""}>{episode.name}</h4>
            <p className="episode-desc">{episode.description}</p>
            <div className="podcast-play-container">
              <PlayerButton
                state={isPlaying ? "playing" : "paused"}
                size="15"
                width="35px"
                height="35px"
                onClick={handleButtonClick}
              />
              <span className="episode-date">
                {getShortDate(episode.release_date)} *{" "}
                <span>
                  {getTimeFromSec(Math.floor(episode.duration_ms / 1000))}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LastEpisode = ({ episode }: { episode: EpisodeType }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();
  const [controlMutation] = useControlPlayerMutation();
  const handleNavigation = () => {
    navigate(`/episode/${episode.id}`);
  };

  const { isPaused, currTrack: playingTrack } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    if (isPaused) {
      setIsPlaying(false);
    } else {
      if (playingTrack?.name === episode.name) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
  }, [playingTrack]);

  const handleButtonClick = (e: any) => {
    e.stopPropagation();
    if (!isPlaying) {
      const isEpisodePlaying = playingTrack?.uri === episode.uri;
      let args = {};
      if (!isEpisodePlaying) {
        args = { uris: [episode.uri] };
        // args = { context_uri: episode.uri };
      }
      controlMutation({
        deviceId: "",
        action: "play",
        args,
      });
    } else {
      controlMutation({
        deviceId: "",
        action: "pause",
      });
    }
  };

  if (!episode) return null;
  return (
    <div className="last-episode-container" onClick={handleNavigation}>
      <p className="last-episode">Latest Episode</p>
      <h4 className={isPlaying ? "playing" : ""}>{episode.name}</h4>
      <p className="episode-desc">{episode.description}</p>
      <div className="podcast-play-container">
        <PlayerButton
          state={isPlaying ? "playing" : "paused"}
          size="15"
          width="35px"
          height="35px"
          onClick={handleButtonClick}
        />
        <span className="episode-date">
          {getShortDate(episode?.release_date)} *
          <span>{getTimeFromSec(Math.floor(episode?.duration_ms / 1000))}</span>
        </span>
      </div>
    </div>
  );
};

export default ShowPage;
