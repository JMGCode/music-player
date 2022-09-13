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
        style={{
          backgroundColor: "#56bd40",
          borderColor: "#56bd40",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        Log out
      </Button>
    </div>
  );
};

export default Search;
