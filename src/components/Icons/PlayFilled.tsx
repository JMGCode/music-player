const PlayFilled = ({
  id = "",
  size = "32",
  color = "black",
  backgroundColor = "white",
  onClick = () => {},
  isHover = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_87_18)">
        <circle cx="12" cy="12" r="12" fill={backgroundColor} />
        <path
          d="M17.1 10.6144C17.8876 11.0691 18.2814 11.2964 18.4135 11.5933C18.5288 11.8522 18.5288 12.1478 18.4135 12.4067C18.2814 12.7036 17.8876 12.9309 17.1 13.3856L10.65 17.1096C9.86241 17.5643 9.46861 17.7916 9.14547 17.7577C8.86361 17.728 8.60757 17.5802 8.44098 17.3509C8.25 17.0881 8.25 16.6333 8.25 15.7239L8.25 8.27609C8.25 7.36666 8.25 6.91194 8.44098 6.64907C8.60757 6.41979 8.86361 6.27196 9.14547 6.24234C9.46861 6.20837 9.86241 6.43573 10.65 6.89045L17.1 10.6144Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_87_18">
          <rect width="24" height="24" fill={backgroundColor} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PlayFilled;
