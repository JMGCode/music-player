import "./index.css";

import {
  HomePage,
  LibraryArtistsPage,
  LibraryPage,
  LibraryPlaylistsPage,
  LibraryPodcastsPage,
  PlaylistPage,
  SearchAllPage,
  SearchArtistPage,
  SearchIndexPage,
  SearchPage,
  SearchQueryPage,
} from "./pages";

import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { persistor, store } from "./app/store";

import Dashboard from "./Dashboard";
import ErrorPage from "./error-page";
import { Lyrics } from "./components";
import OAuth from "./OAuth";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

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
      const tokenS = JSON.parse(tokenStorage || "")?.accessToken;
      if (token === "" && tokenS === "") {
        return redirect("/login");
      }
    },
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/search",
        element: <SearchPage />,
        children: [
          { path: "/search", element: <SearchIndexPage /> },
          {
            path: "/search/:searchQuery",
            element: <SearchQueryPage />,
            children: [
              { path: "/search/:searchQuery", element: <SearchAllPage /> },
              {
                path: "/search/:searchQuery/:searchQueryType",
                element: <SearchArtistPage />,
              },
            ],
          },
        ],
      },
      { path: "/playlist/:playlistId", element: <PlaylistPage /> },
      { path: "/lyrics", element: <Lyrics /> },
      {
        path: "/collection",
        element: <LibraryPage />,
        children: [
          { path: "/collection/playlists", element: <LibraryPlaylistsPage /> },
          { path: "/collection/artists", element: <LibraryArtistsPage /> },
          { path: "/collection/shows", element: <LibraryPodcastsPage /> },
        ],
      },
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
