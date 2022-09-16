import "./Search.css";

import { Button, Form } from "react-bootstrap";
import React, { useState } from "react";

interface ISearch {
  onChange: Function;
}

//TODO: Mover estilo del boton a un archivo css
//TODO: Agregar funcion de log out
//TODO: Mover boton log out a un componente separado de Search
const Search: React.FC<ISearch> = ({ onChange }) => {
  const [search, setSearch] = useState("");
  const authUrl =
    "https://accounts.spotify.com/authorize?client_id=fdbb32b746414133adaa41a22ace8ba5&response_type=code&show_dialog=true&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

  return (
    <div className="search-bar">
      <Form.Control
        type="search"
        placeholder="Search Songs/Artist"
        value={search}
        onChange={(e) => {
          const { value } = e.target;
          //debounce on change
          onChange(value);
          //keep without debounce to show new input on search bar
          setSearch(value);
        }}
      />
      <Button
        href={authUrl}
        style={{
          width: "minContent",
          backgroundColor: "#56bd40",
          borderColor: "#56bd40",
          textOverflow: "ellipsis",
          // overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        Log out
      </Button>
    </div>
  );
};

export default Search;
