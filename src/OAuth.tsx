/**
 * Spotify redirects to this page
 * and with the code provided gets
 * credentials token and refreshToken
 * and dispatch them to store
 */

import { useAppDispatch, useAppSelector } from "./app/hooks";

import Login from "./Login";
import { setCredentials } from "./features/auth/authSlice";
import { useEffect } from "react";
import { useLoginMutation } from "./features/api/serverAPI";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const [loginMutation] = useLoginMutation();
  const { accessToken } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    async function login() {
      console.log("accessToken==== ", accessToken);
      if (accessToken !== "") navigate("/");
      console.log("code======", code);
      if (!code) return;
      try {
        const payload = await loginMutation(code).unwrap();
        console.log("login response", payload);
        dispatch(setCredentials(payload));
        // navigate("/");
      } catch (error) {
        console.error("rejected", error);
      }
    }
    login();
  }, [code]);

  return <Login />;
};

export default OAuth;
