export interface IGenSearch {
  albums?: Albums;
  artists?: Artists;
  tracks?: Tracks;
  shows?: Shows;
}

export interface Albums {
  href: string;
  items: AlbumElement[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

export interface AlbumElement {
  album_type: AlbumTypeEnum;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: AlbumTypeEnum;
  uri: string;
}

export enum AlbumTypeEnum {
  Album = "album",
  Single = "single",
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: ArtistType;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export enum ArtistType {
  Artist = "artist",
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export enum ReleaseDatePrecision {
  Day = "day",
}

export interface Artists {
  href: string;
  items: ArtistsItem[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

export interface ArtistsItem {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: ArtistType;
  uri: string;
}

export interface Followers {
  href: null;
  total: number;
}

export interface Shows {
  href: string;
  items: ShowsItem[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

export interface ShowsItem {
  available_markets: string[];
  copyrights: any[];
  description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  html_description: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: Language[];
  media_type: MediaType;
  name: string;
  publisher: string;
  total_episodes: number;
  type: PurpleType;
  uri: string;
}

export enum Language {
  En = "en",
  Es = "es",
  EsMX = "es-MX",
}

export enum MediaType {
  Audio = "audio",
}

export enum PurpleType {
  Show = "show",
}

export interface Tracks {
  href: string;
  items: TracksItem[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

export interface TracksItem {
  album: AlbumElement;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: null | string;
  track_number: number;
  type: FluffyType;
  uri: string;
}

export interface ExternalIDS {
  isrc: string;
}

export enum FluffyType {
  Track = "track",
}
