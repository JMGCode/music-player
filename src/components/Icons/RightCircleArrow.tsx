const RightCircleArrow = ({
  size = "32",
  circleColor = "black",
  color = "white",
  onClick = () => {},
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g clipPath="url(#clip0_88_31)">
        <circle r="12" transform="matrix(-1 0 0 1 12 12)" fill={circleColor} />
        <line
          y1="-1"
          x2="9.45"
          y2="-1"
          transform="matrix(0.718258 0.695777 0.724414 -0.689365 9.98672 5.10498)"
          stroke={color}
          strokeWidth="2"
        />
        <line
          y1="-1"
          x2="9.44511"
          y2="-1"
          transform="matrix(0.733456 -0.679737 -0.709448 -0.704757 8.90961 17.2345)"
          stroke={color}
          strokeWidth="2"
        />
      </g>
      <defs>
        <clipPath id="clip0_88_31">
          <rect
            width="24"
            height="24"
            fill={color}
            transform="matrix(-1 0 0 1 24 0)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RightCircleArrow;
