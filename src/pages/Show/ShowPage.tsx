import "./ShowPage.css";

import { useEffect, useRef, useState } from "react";
import {
  useGetEpisodesQuery,
  useGetShowQuery,
} from "../../features/api/spotify";

import { PlayerButton } from "../../components/PlayerButton";
import { ScrollHeader } from "../../Layout/Container/ScrollHeader";
import { ScrollHeaderContent } from "../../Layout/Container/ScrollHeader/ScrollHeader";
import { useParams } from "react-router-dom";

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
      <ScrollHeaderContent>
        <div
          className={`podcast-container ${columns === 2 ? "col-2" : ""}`}
          ref={podcastsContainerRef}
        >
          <div className="podcast-info">
            <h2 className="podcast-header">About</h2>
            <p className="podcast-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              tempora reiciendis nihil nostrum maiores enim cum doloribus eaque
              sapiente, sequi eligendi magnam a beatae voluptatum ipsam quis
              consequuntur esse? Omnis. Aut alias dolore nemo ea corporis
              debitis adipisci modi eos quod deleniti perspiciatis impedit a, ad
              dignissimos ullam expedita eveniet similique? Modi cumque voluptas
              officia odio accusamus nesciunt natus minus.
            </p>
            {/* <div className="podcast-tag">Negocios</div> */}
          </div>
          <div className="podcast-content">
            <div className="last-episode-container">
              <p className="last-episode">Latest Episode</p>
              <h4>
                Procrastionación - Un Resumen de Libros para Emprendedores
              </h4>
              <p className="episode-desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                ad nobis exercitationem et odit inventore hic illum vero
                distinctio consectetur necessitatibus incidunt, quo modi dolorum
                cumque facere ducimus nemo vitae?
              </p>
              <div className="podcast-play-container">
                <PlayerButton
                  state="paused"
                  size="20"
                  width="45px"
                  height="45px"
                />
                <span>
                  10 jul * <span>49 min 7s</span>
                </span>
              </div>
            </div>

            <h2 className="podcast-header">All episodes</h2>
            <div className="episode-list">
              <div className="episode-item-container">
                <img src="" alt="" />
                <div className="episode-item">
                  <h4>
                    Piensa en Grande - Un Resumen de Libros para Emprendedores
                  </h4>
                  <p className="episode-desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Assumenda expedita voluptate, illo iusto inventore fugiat
                    alias, fuga fugit tempora repellendus molestias porro? Omnis
                    numquam minus architecto suscipit nobis commodi voluptates.
                  </p>
                  <div className="podcast-play-container">
                    <PlayerButton
                      state="paused"
                      size="20"
                      width="45px"
                      height="45px"
                    />
                    <span>
                      12 jul * <span>1 h 18 min</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollHeaderContent>
    </>
  );
};

export default ShowPage;
