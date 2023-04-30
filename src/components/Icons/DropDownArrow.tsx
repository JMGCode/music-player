const DropDownArrow = ({
  id = "",
  size = "32",
  color = "white",
  onClick = () => {},
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 9 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g clipPath="url(#clip0_150_2)">
        <path
          d="M4.5 4.11713L8.94615 0.0293427H0.0538497L4.5 4.11713Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_150_2">
          <rect width="9" height="4.2" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DropDownArrow;
