export interface IPlaylists {
  href: string;
  items: Item[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

interface Item {
  collaborative: boolean;
  description: Description;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: ItemType;
  uri: string;
}

enum Description {
  Empty = "",
  HeavyMusicForAHeavyWorkout = "Heavy music for a heavy workout!",
  PlaylistCreatedUsingTheSpotifyAPI = "Playlist created using the Spotify API",
}

interface ExternalUrls {
  spotify: string;
}

interface Image {
  height: number | null;
  url: string;
  width: number | null;
}

interface Owner {
  display_name: DisplayName;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: OwnerType;
  uri: URI;
}

enum DisplayName {
  AlannaCarson = "Alanna Carson",
  BenganBengtsson = "Bengan Bengtsson",
  JesusGuadalupeMezquitiGuerrero = "Jesus Guadalupe Mezquiti Guerrero",
}

enum OwnerType {
  User = "user",
}

enum URI {
  SpotifyUser1283653431 = "spotify:user:1283653431",
  SpotifyUserAecarson = "spotify:user:aecarson",
  SpotifyUserBeengan = "spotify:user:beengan",
}

interface Tracks {
  href: string;
  total: number;
}

enum ItemType {
  Playlist = "playlist",
}
