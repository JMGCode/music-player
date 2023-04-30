const baseUrl = "https://accounts.spotify.com/authorize";
// const redirectUri = "http://localhost:3000/login";
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const scope = [
  "streaming",
  "user-read-currently-playing",
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "user-library-modify",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-top-read",
  "user-read-recently-played",
  "user-follow-read",
];

const scopeStr = scope.reduce((acc, curr, index) => {
  acc += curr;
  if (index !== scope.length - 1) {
    acc += "%20";
  }
  return acc;
}, "");

const authUrl = `${baseUrl}?client_id=fdbb32b746414133adaa41a22ace8ba5&response_type=code&redirect_uri=${redirectUri}&scope=${scopeStr}&show_dialog=${true}`;

const Login = () => {
  return (
    <div
      style={{
        minHeight: "100svh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <a
        style={{
          backgroundColor: "green",
          padding: "16px 32px",
          borderRadius: "10px",
          color: "white",
          textDecoration: "none",
        }}
        href={authUrl}
      >
        Login With Spotify
      </a>
    </div>
  );
};

export default Login;
