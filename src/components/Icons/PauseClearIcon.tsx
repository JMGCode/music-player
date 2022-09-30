const PauseClearIcon = ({
  size = "32",
  color = "white",
  onClick = () => {},
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <line
        x1="3.46255"
        y1="1.49753"
        x2="3.46256"
        y2="10.5025"
        stroke={color}
        stroke-width="2"
      />
      <line
        x1="7.50435"
        y1="1.49753"
        x2="7.50435"
        y2="10.5025"
        stroke={color}
        stroke-width="2"
      />
    </svg>
  );
};

export default PauseClearIcon;
