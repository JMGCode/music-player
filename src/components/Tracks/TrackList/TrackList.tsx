import { ISpotifyTrack } from "../../../features/dashboard/dashboardSlice";
import TrackItem from "../TrackItem/TrackItem";
import { useAppSelector } from "../../../app/hooks";
import { useControlPlayerMutation } from "../../../features/api/spotify";

const TrackList: React.FC<{ uri?: string; tracks: ISpotifyTrack[] }> = ({
  uri,
  tracks,
}) => {
  const [controlMutation] = useControlPlayerMutation();
  const playingTrack = useAppSelector((state) => state.dashboard.currTrack);
  return (
    <div className="flex-grow-1 my-2">
      {tracks?.map((track, index) => {
        return (
          <TrackItem
            track={track}
            key={track.uri + index}
            chooseTrack={(value: ISpotifyTrack) => {
              const args = uri
                ? {
                    context_uri: uri,
                    offset: {
                      position: index,
                    },
                    position_ms: 0,
                  }
                : {
                    uris: [value.uri],

                    position_ms: 0,
                  };

              controlMutation({
                deviceId: "",
                action: "play",
                args,
              });
            }}
          />
        );
      })}
    </div>
  );
};

export default TrackList;
