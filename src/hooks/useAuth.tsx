import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";

interface IAuthContext {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  spotifyApi: SpotifyWebApi | undefined;
}

const defaultState: IAuthContext = {
  accessToken: "",
  refreshToken: "",
  expiresIn: 0,
  spotifyApi: undefined,
};

const AuthContext = createContext<Partial<IAuthContext>>(defaultState);
export default AuthContext;

export const AuthProvider: React.FC<PropsWithChildren<{ code: string }>> = ({
  code,
  children,
}) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState(0);

  const [spotifyApi, setSpotifyApi] = useState<SpotifyWebApi>();

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", { code })
      .then((res) => {
        const {
          accessToken: acc,
          refreshToken: ref,
          expiresIn: exp,
        } = res.data;
        setAccessToken(acc);
        setRefreshToken(ref);
        setExpiresIn(exp);

        window.history.pushState({}, "", "/");
      })
      .catch((error) => {
        // window.location.href = "/";
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", { refreshToken })
        .then((res) => {
          const { accessToken: acc, expiresIn: exp } = res.data;
          setAccessToken(acc);
          setExpiresIn(exp);
        })
        .catch((error) => {
          // window.location.href = "/";
        });
    }, (expiresIn - 60) * 1000);
    // }, 10 * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  useEffect(() => {
    if (!accessToken) return;
    const _spotifyApi = new SpotifyWebApi({
      clientId: "fdbb32b746414133adaa41a22ace8ba5",
    });

    _spotifyApi.setAccessToken(accessToken);

    setSpotifyApi(_spotifyApi);
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, expiresIn, spotifyApi }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
