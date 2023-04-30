import "./List.css";

import { FC } from "react";
export type ListType = "wrap" | "noWrap" | "scroll";

interface Props {
  children: React.ReactNode;
  type: ListType;
  isLoading?: boolean;
  quantity?: number;
  skeleton?: React.ReactNode;
}
const List: FC<Props> = ({
  children,
  type,
  isLoading,
  quantity = 8,
  skeleton,
}) => {
  const listType = {
    wrap: "",
    noWrap: "list-container-nowrap",
    scroll: "list-container-scroll",
  };

  if (isLoading && skeleton) {
    const array = Array(quantity).fill(0);
    return (
      <div className={`list-container ${listType[type]}`}>
        {array?.map((_, index) => (
          <div key={`skeleton-list-${index}`}>{skeleton}</div>
        ))}
      </div>
    );
  }

  return <div className={`list-container ${listType[type]}`}>{children}</div>;
};

export default List;
