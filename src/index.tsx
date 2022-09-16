import "bootstrap/dist/css/bootstrap.min.css";

import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { persistor, store } from "./app/store";

import Dashboard from "./Dashboard";
import ErrorPage from "./error-page";
import OAuth from "./OAuth";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { SearchPage, PlaylistPage } from "./Pages";
import { Lyrics } from "./components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,

    errorElement: <ErrorPage />,
    loader: () => {
      const token = store.getState().auth.accessToken;
      const tokenStorage = localStorage.getItem("persist:main-root");
      if (token === "" && !tokenStorage) {
        return redirect("/login");
      }
    },
    children: [
      { path: "/", element: <p style={{ color: "white" }}>HOME!!!!</p> },
      { path: "/search", element: <SearchPage /> },
      { path: "/playlist/:playlistId", element: <PlaylistPage /> },
      { path: "/lyrics", element: <Lyrics /> },
    ],
  },
  {
    path: "/login",
    element: <OAuth />,
    errorElement: <ErrorPage />,
  },
]);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={<p>loading ....</p>} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
