const CrossIcon = ({ size = "32", color = "white", onClick = () => {} }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g clipPath="url(#clip0_127_120)">
        <line
          x1="0.731365"
          y1="0.819692"
          x2="16.1158"
          y2="17.318"
          stroke={color}
          strokeWidth="2"
        />
        <line
          x1="0.827384"
          y1="17.3166"
          x2="16.2699"
          y2="0.818331"
          stroke={color}
          strokeWidth="2"
        />
      </g>
      <defs>
        <clipPath id="clip0_127_120">
          <rect width="17" height="18" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CrossIcon;
