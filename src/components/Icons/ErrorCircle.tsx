const ErrorCircle = ({
  id = "",
  size = "32",
  color = "black",
  backgroundColor = "white",
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
      <g clipPath="url(#clip0_150_41)">
        <circle cx="12" cy="12" r="12" fill={backgroundColor} />
        {/* <circle cx="12" cy="12" r="12" fill="#D9D9D9" /> */}
        <path
          d="M7.38961 5.6369L5.6369 7.38961L10.2473 12L5.6369 16.6104L7.38961 18.3631L12 13.7527L16.6104 18.3631L18.3631 16.6104L13.7527 12L18.3631 7.38961L16.6104 5.6369L12 10.2473L7.38961 5.6369Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_150_41">
          <rect width="24" height="24" fill={backgroundColor} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ErrorCircle;
