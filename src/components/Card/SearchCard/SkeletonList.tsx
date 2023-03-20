import { FC, PropsWithChildren, useEffect, useState } from "react";

interface IProps {
  quantity: number;
}

const SkeletonList: FC<PropsWithChildren<IProps>> = ({
  quantity,
  children,
}) => {
  const array = Array(quantity).fill(0);
  return (
    <div className="search-list-container">{array?.map(() => children)}</div>
  );
};

export default SkeletonList;
