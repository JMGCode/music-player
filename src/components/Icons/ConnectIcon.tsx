const Connect = ({
  id = "",
  size = "32",
  color = "white",
  onClick = () => {},
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g clipPath={`url(#${id !== "" ? id : "clip0_28_12"})`}>
        <rect
          x="1.16145"
          y="1.39786"
          width="14.677"
          height="10.2753"
          rx="3"
          stroke={color}
          strokeWidth="2"
        />
        <line
          x1="1.16145"
          y1="14.6021"
          x2="15.8386"
          y2="14.6021"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id={`${id !== "" ? id : "clip0_28_12"}`}>
          <rect width="17" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Connect;
