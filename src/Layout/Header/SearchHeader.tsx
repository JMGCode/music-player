import { FC, PropsWithChildren, useRef, useState } from "react";

import Header from "./Header";
import { Search } from "../../components";

interface IProps {
  onChange: Function;
  setSearch: Function;
  search: string;
}

const SearchHeader: FC<PropsWithChildren<IProps>> = ({
  children,
  onChange,
  setSearch,
  search,
}) => {
  return (
    <Header
      styles={{
        container: {
          padding: "0 20px 0 40px",
        },
      }}
    >
      <Search onChange={onChange} search={search} setSearch={setSearch} />
      {children}
    </Header>
  );
};

export default SearchHeader;
