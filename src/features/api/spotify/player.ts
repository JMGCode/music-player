import { spotifyApiSlice } from "./spotifySlice";

interface IDevice {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
}

interface IAddQueueArgs {
  deviceId?: string;
  uri: string;
}

export type ControlType = "play" | "pause" | "next" | "previous";

export const extendedApiSlice = spotifyApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecentlyPlayed: builder.query<any, void>({
      query: () => `me/player/recently-played`,
      transformResponse: (data: any) => {
        const foundItems: any[] = [];
        //@ts-ignore
        const filterItems = data.items.filter((item: any) => {
          const isPresent = !foundItems.includes(item.track.id);
          foundItems.push(item.track.id);
          return isPresent;
        });
        return { ...data, items: filterItems };
      },
    }),
    getCurrentPlayingTrack: builder.query<any, any>({
      query: () => `me/player/currently-playing`,
    }),
    addToPlayQueue: builder.mutation<any, IAddQueueArgs>({
      query: ({ deviceId, uri }) => ({
        url: `me/player/queue${deviceId ? `?device_id=${deviceId}` : ""}`,
        method: "POST",
        body: { device_id: deviceId, uri },
      }),
    }),
    nextTrack: builder.mutation<any, string>({
      query: (deviceId) => ({
        url: `me/player/next?device_id=${deviceId}`,
        method: "POST",
      }),
    }),
    previousTrack: builder.mutation<any, string>({
      query: (deviceId) => ({
        url: `me/player/previous?device_id=${deviceId}`,
        method: "POST",
      }),
    }),
    startPlayer: builder.mutation<any, string>({
      query: (deviceId) => ({
        url: `me/player/play?device_id=${deviceId}`,
        method: "PUT",
      }),
    }),
    pausePlayer: builder.mutation<any, string>({
      query: (deviceId) => ({
        url: `me/player/pause?device_id=${deviceId}`,
        method: "PUT",
      }),
    }),
    controlPlayer: builder.mutation<
      any,
      { deviceId: string; action: ControlType; args?: any }
    >({
      query: ({ deviceId, action, args }) => {
        const method = action === "pause" || action === "play" ? "PUT" : "POST";
        return {
          url: `me/player/${action}`,
          method,
          body: { device_id: deviceId, ...args },
        };
      },
    }),
    repeatPlayedTrack: builder.mutation<
      any,
      {
        state: string;
        deviceId?: string;
      }
    >({
      query: ({ state, deviceId }) => {
        let queryP = "?";
        queryP += `${state ? `state=${state}` : 'state="off"'}`;
        queryP += `&${deviceId ? `device_id=${deviceId}` : ""}`;
        return {
          url: `me/player/repeat${queryP}`,
          method: "PUT",
        };
      },
    }),
    toggleShufflePlayer: builder.mutation<
      any,
      {
        state: boolean;
        deviceId?: string;
      }
    >({
      query: ({ state, deviceId }) => {
        let queryP = "?";
        queryP += `${state ? `state=true` : "state=false"}`;
        queryP += `&${deviceId ? `device_id=${deviceId}` : ""}`;
        return {
          url: `me/player/shuffle${queryP}`,
          method: "PUT",
        };
      },
    }),
    setPlayerVolume: builder.mutation<
      any,
      { volume: number; deviceId?: string }
    >({
      query: ({ volume, deviceId = "" }) => {
        const a = `volume_percent=${volume}${
          deviceId !== "" ? `&device_id=${deviceId}` : ""
        }`;
        return {
          url: `me/player/volume?${a}`,
          method: "PUT",
        };
      },
    }),
    getDevices: builder.query<{ devices: IDevice[] }, void>({
      query: () => `me/player/devices`,
    }),
    transferPlayer: builder.mutation<any, { deviceId: string; play?: boolean }>(
      {
        query: ({ deviceId, play = true }) => ({
          url: "/me/player",
          method: "PUT",
          body: {
            device_ids: [deviceId],
            play,
          },
        }),
      }
    ),
    getPlayerState: builder.query<any, void>({
      query: () => "/me/player",
    }),
  }),
});

export const {
  useGetCurrentPlayingTrackQuery,
  useAddToPlayQueueMutation,
  usePausePlayerMutation,
  useStartPlayerMutation,
  useNextTrackMutation,
  usePreviousTrackMutation,
  useRepeatPlayedTrackMutation,
  useToggleShufflePlayerMutation,
  useSetPlayerVolumeMutation,
  useGetDevicesQuery,
  useTransferPlayerMutation,
  useGetPlayerStateQuery,
  useControlPlayerMutation,
  useGetRecentlyPlayedQuery,
} = extendedApiSlice;
