import "./Episode.css";

import { PlayerButton } from "../../components/PlayerButton";
import { ScrollHeader } from "../../Layout/Container/ScrollHeader";
import { ScrollHeaderContent } from "../../Layout/Container/ScrollHeader/ScrollHeader";
import { useGetEpisodeQuery } from "../../features/api/spotify";
import { useParams } from "react-router-dom";

const EpisodePage = () => {
  const { episodeId = "" } = useParams();

  const { data, isLoading } = useGetEpisodeQuery(episodeId, {
    skip: episodeId === "",
  });

  console.log("------", data);

  return (
    <>
      <ScrollHeader>
        <img
          // src={showData?.images[0].url}
          src=""
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
          <div className="playlist-name">{"showData?.name"}</div>
          <div className="podcast-publisher">{"showData?.publisher"}</div>
        </div>
      </ScrollHeader>
      <ScrollHeaderContent noPadding>
        <div className={`podcast-container`}>
          <div className="podcast-info">
            <h2 className="podcast-header">About</h2>
            <p className={`podcast-desc`}>Description</p>

            <p
              className="podcast-show-more"
              // onClick={() => setShowMore((prev) => !prev)}
            >
              {/* {showMore ? "Show less" : "...Show more"} */}
              {"...Show more"}
            </p>
          </div>
          <div className="podcast-content">
            <div className="last-episode-container">
              <p className="last-episode">Latest Episode</p>
              <h4>{"episodesData?.items[0].name"}</h4>
              <p className="episode-desc">
                {"episodesData?.items[0].description"}
              </p>
              <div className="podcast-play-container">
                <PlayerButton
                  state="paused"
                  size="15"
                  width="35px"
                  height="35px"
                />
                <span className="episode-date">
                  {"13 Jul"} *
                  <span>
                    {/* {getTimeFromSec(
                      Math.floor(episodesData?.items[0].duration_ms / 1000)
                    )} */}
                    {"1 hr 25 min"}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </ScrollHeaderContent>
    </>
  );
};

export default EpisodePage;
