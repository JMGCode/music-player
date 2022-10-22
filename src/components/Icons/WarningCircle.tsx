const WarningCircle = ({
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
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g clip-path="url(#clip0_153_47)">
        <circle cx="12.4747" cy="12" r="12" fill={backgroundColor} />
        {/* <circle cx="12.4747" cy="12" r="12" fill="#D9D9D9" /> */}
        <path
          d="M11.9592 14.1529C12.057 14.8076 12.8924 14.8076 12.9903 14.1529L13.968 7.58356C14.148 5.0222 10.8 5.0222 10.9808 7.58356L11.9592 14.1529"
          fill={color}
        />
        <path
          d="M12.4747 18.3374C13.3038 18.3374 13.9758 17.6673 13.9758 16.8406C13.9758 16.0139 13.3038 15.3438 12.4747 15.3438C11.6457 15.3438 10.9736 16.0139 10.9736 16.8406C10.9736 17.6673 11.6457 18.3374 12.4747 18.3374Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_153_47">
          <rect
            width="24"
            height="24"
            fill={backgroundColor}
            transform="translate(0.474731)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default WarningCircle;
