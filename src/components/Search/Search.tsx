import "./Search.css";

import { Button, Form } from "react-bootstrap";
import { CrossIcon, SearchIcon } from "../Icons";
import React, { useState } from "react";

interface ISearch {
  onChange: Function;
  setSearch: Function;
  search: string;
}

//TODO: Mover estilo del boton a un archivo css
//TODO: Agregar funcion de log out
//TODO: Mover boton log out a un componente separado de Search
const Search: React.FC<ISearch> = ({ onChange, setSearch, search }) => {
  // const [search, setSearch] = useState("");

  return (
    <div
      style={{
        width: "40vw",
        height: "40px",
        backgroundColor: "white",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: 0,
          height: "100%",
          paddingLeft: "20px",
        }}
      >
        <SearchIcon color="black" size="20" />
      </div>
      <input
        value={search}
        placeholder="What do you want to listen to?"
        style={{
          outline: "none",
          outlineWidth: "0",
          marginLeft: "10px",
          height: "100%",
          width: "calc(100% - 80px)",
          // width: "80%",
          border: "none",
        }}
        onChange={(e) => {
          const { value } = e.target;
          //debounce on change
          onChange(value);
          //keep without debounce to show new input on search bar
          setSearch(value);
        }}
      ></input>
      {search !== "" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: 0,
            height: "100%",
            paddingRight: "20px",
            paddingLeft: "12px",
          }}
        >
          <CrossIcon
            color="black"
            size="18"
            onClick={() => {
              onChange("");
              setSearch("");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Search;

{
  /* 
  
   // const authUrl =
  //   "https://accounts.spotify.com/authorize?client_id=fdbb32b746414133adaa41a22ace8ba5&response_type=code&show_dialog=true&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

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
      </Button> */
}
