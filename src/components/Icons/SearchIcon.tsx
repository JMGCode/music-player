const SearchIcon = ({
  size = "32",
  color = "white",
  isSelected = false,
  onClick = () => {},
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g clipPath="url(#clip0_89_36)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.25854 14.5171C11.2673 14.5171 14.5171 11.2673 14.5171 7.25854C14.5171 3.24976 11.2673 0 7.25854 0C3.24976 0 0 3.24976 0 7.25854C0 11.2673 3.24976 14.5171 7.25854 14.5171ZM7.25854 12.6314C10.2259 12.6314 12.6314 10.2259 12.6314 7.25854C12.6314 4.29119 10.2259 1.88568 7.25854 1.88568C4.29119 1.88568 1.88568 4.29119 1.88568 7.25854C1.88568 10.2259 4.29119 12.6314 7.25854 12.6314Z"
          fill={color}
        />
        <path
          d="M10.9971 12.788L14.8895 16.6804"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {isSelected && (
          <circle cx="7.25854" cy="7.25854" r="4.19388" fill={color} />
        )}
      </g>
      <defs>
        <clipPath id="clip0_89_36">
          <rect width="16" height="18" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SearchIcon;
