const LeftCircleArrow = ({
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
      <g clipPath="url(#clip0_88_25)">
        <circle cx="12" cy="12" r="12" fill={circleColor} />
        <line
          y1="-1"
          x2="9.45"
          y2="-1"
          transform="matrix(-0.718258 0.695777 -0.724414 -0.689365 14.0133 5.10498)"
          stroke={color}
          strokeWidth="2"
        />
        <line
          y1="-1"
          x2="9.44511"
          y2="-1"
          transform="matrix(-0.733456 -0.679737 0.709448 -0.704757 15.0904 17.2345)"
          stroke={color}
          strokeWidth="2"
        />
      </g>
      <defs>
        <clipPath id="clip0_88_25">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LeftCircleArrow;
