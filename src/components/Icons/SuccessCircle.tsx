const SuccessCircle = ({
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
      <g clipPath="url(#clip0_150_33)">
        <circle cx="12" cy="12" r="12" fill={backgroundColor} />
        {/* <circle cx="12" cy="12" r="12" fill={backgroundColor} /> */}
        <path
          d="M9.65483 17.7872L3.80471 11.9371C3.51879 11.6512 3.51879 11.1883 3.80471 10.9031L4.83872 9.86909C5.12465 9.58316 5.58754 9.58316 5.87273 9.86909L10.1718 14.1682L18.1273 6.21276C18.4132 5.92684 18.8761 5.92684 19.1613 6.21276L20.1953 7.24677C20.4812 7.5327 20.4812 7.99559 20.1953 8.28078L10.6888 17.7872C10.4036 18.0731 9.94002 18.0731 9.65483 17.7872Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_150_33">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SuccessCircle;
