const PauseIcon = ({ size = "32", color = "black", onClick = () => {} }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32 16.24C32 25.0765 24.8366 32.24 16 32.24C7.16344 32.24 0 25.0765 0 16.24C0 7.40343 7.16344 0.23999 16 0.23999C24.8366 0.23999 32 7.40343 32 16.24ZM10 7.59285H13.3333V24.9262H10V7.59285ZM22 7.51603H18.6667V24.8494H22V7.51603Z"
        fill="white"
      />
    </svg>
  );
};

export default PauseIcon;
