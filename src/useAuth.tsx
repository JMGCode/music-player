import { useEffect, useState } from "react";

import axios from "axios";

interface Props {
  code?: string;
}

const useAuth = ({ code }: Props) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState(0);

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
          console.log("refresh", res.data);
          const { accessToken: acc, expiresIn: exp } = res.data;
          setAccessToken(acc);
          setExpiresIn(exp);
        })
        .catch((error) => {
          // window.location.href = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return { accessToken, refreshToken, expiresIn };
};

export default useAuth;
