const HouseIcon = ({
  size = "32",
  color = "white",
  onClick = () => {},
  isSelected = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 11 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g clipPath="url(#clip0_118_50)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.987 3.996L5.54833 0L0.109639 3.996H0.106512V3.9983L0.0966492 4.00555H0.106512V13.1012H10.9903V4.00555H11L10.9903 3.99841V3.996H10.987ZM9.75017 4.93624L5.62948 1.88614L1.50879 4.93624H1.50642V4.938L1.49893 4.94354H1.50642V11.8862H9.75268V4.94354H9.76003L9.75268 4.9381V4.93624H9.75017Z"
          fill={color}
        />
        {isSelected && (
          <>
            <path
              d="M5.6295 1.88452L9.76005 4.94192H1.49895L5.6295 1.88452Z"
              fill={color}
            />

            <rect
              x="1.50644"
              y="4.93463"
              width="8.24627"
              height="6.94995"
              fill={color}
            />
          </>
        )}
      </g>
      <defs>
        <clipPath id="clip0_118_50">
          <rect width="11" height="13" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default HouseIcon;
