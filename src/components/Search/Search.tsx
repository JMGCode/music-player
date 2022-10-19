import "./Search.css";

import { CrossIcon, SearchIcon } from "../Icons";
import React, { useState } from "react";

interface ISearch {
  onChange: Function;
  setSearch: Function;
  search: string;
}

const Search: React.FC<ISearch> = ({ onChange, setSearch, search }) => {
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
          padding: "0",
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
