import { Container } from "react-bootstrap";

const authUrl =
  "https://accounts.spotify.com/authorize?client_id=fdbb32b746414133adaa41a22ace8ba5&response_type=code&redirect_uri=http://localhost:3000/login&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const Login = () => {
  //TODO: Remove Bootstrap
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={authUrl}>
        Login With Spotify
      </a>
    </Container>
  );
};

export default Login;
