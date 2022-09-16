export interface IPlaylist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

interface ExternalUrls {
  spotify: string;
}

interface Followers {
  href: null;
  total: number;
}

interface Image {
  height: number;
  url: string;
  width: number;
}

interface Owner {
  display_name?: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: OwnerType;
  uri: string;
  name?: string;
}

enum OwnerName {
  Mika = "MIKA",
}

enum OwnerType {
  Artist = "artist",
  User = "user",
}

enum OwnerURI {
  SpotifyArtist5MmVJVhhYKQ86IzuGHzJYA = "spotify:artist:5MmVJVhhYKQ86izuGHzJYA",
  SpotifyUser1283653431 = "spotify:user:1283653431",
}

interface Tracks {
  href: string;
  items: Item[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

interface Item {
  added_at: Date;
  added_by: Owner;
  is_local: boolean;
  primary_color: null;
  track: Track;
  video_thumbnail: VideoThumbnail;
}

interface Track {
  album: Album;
  artists: Owner[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: null;
  track: boolean;
  track_number: number;
  type: TrackType;
  uri: string;
}

interface Album {
  album_type: AlbumTypeEnum;
  artists: Owner[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: ID;
  images: Image[];
  name: AlbumName;
  release_date: Date;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: AlbumTypeEnum;
  uri: AlbumURI;
}

enum AlbumTypeEnum {
  Album = "album",
}

enum ID {
  The2FgwL1GHWKTbuHzAIjEeFa = "2FgwL1GHWKTbuHzAIjEeFa",
}

enum AlbumName {
  LifeInCartoonMotion = "Life In Cartoon Motion",
}

enum ReleaseDatePrecision {
  Day = "day",
}

enum AlbumURI {
  SpotifyAlbum2FgwL1GHWKTbuHzAIjEeFa = "spotify:album:2FgwL1GHWKTbuHzAIjEeFa",
}

interface ExternalIDS {
  isrc: string;
}

enum TrackType {
  Track = "track",
}

interface VideoThumbnail {
  url: null;
}
