const ClockIcon = ({
  size = "32",
  color = "white",
  onClick = () => {},
  value = 0,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_73_122)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM12 21.3116C17.1426 21.3116 21.3116 17.1426 21.3116 12C21.3116 6.85735 17.1426 2.68842 12 2.68842C6.85736 2.68842 2.68843 6.85735 2.68843 12C2.68843 17.1426 6.85736 21.3116 12 21.3116Z"
          fill={color}
        />
        <line
          x1="11.9924"
          y1="3.91873"
          x2="11.9924"
          y2="14.0952"
          stroke={color}
          strokeWidth="3"
        />
        <line
          x1="10.4924"
          y1="12.5952"
          x2="18.6921"
          y2="12.5952"
          stroke={color}
          strokeWidth="3"
        />
      </g>
      <defs>
        <clipPath id="clip0_73_122">
          <rect width="24" height="24" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ClockIcon;
