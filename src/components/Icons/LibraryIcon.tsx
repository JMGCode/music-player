const LibraryIcon = ({
  size = "32",
  color = "white",
  onClick = () => {},
  isSelected = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g clipPath="url(#clip0_118_84)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.87283 2.02686L6.13611 0.199799V14.9521H12.1859V3.20375L9.87283 2.02686ZM9.28438 2.91235L7.35315 1.90961V14.0573H10.9689V3.73776L9.28438 2.91235Z"
          fill={color}
        />
        <line
          x1="4.073"
          x2="4.073"
          y2="14.9521"
          stroke={color}
          strokeWidth="2"
        />
        <line x1="1" x2="1" y2="14.9521" stroke={color} strokeWidth="2" />
        {isSelected && (
          <path
            d="M7.04645 1.64685L9.76955 2.98591L11.2756 3.69772V14.222H7.04645V1.64685Z"
            fill={color}
          />
        )}
      </g>
      <defs>
        <clipPath id="clip0_118_84">
          <rect width="12" height="15" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LibraryIcon;
