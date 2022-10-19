const baseUrl = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/login";
const scope = [
  "streaming",
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

const authUrl = `${baseUrl}?client_id=fdbb32b746414133adaa41a22ace8ba5&response_type=code&redirect_uri=${redirectUri}&scope=${scopeStr}`;

const Login = () => {
  //TODO: Remove Bootstrap
  return (
    <div
      // className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
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
        {/* <a className="btn btn-success btn-lg" href={authUrl}> */}
        Login With Spotify
      </a>
    </div>
  );
};

export default Login;
