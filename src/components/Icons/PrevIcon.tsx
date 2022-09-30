const PrevIcon = ({ size = "32", color = "white", onClick = () => {} }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g clipPath="url(#clip0_5_145)">
        <path
          d="M3.72014 8.19497C2.93255 7.74025 2.53876 7.51289 2.4066 7.21606C2.29133 6.95716 2.29133 6.6615 2.4066 6.40259C2.53876 6.10576 2.93255 5.8784 3.72014 5.42369L10.1701 1.69978C10.9577 1.24506 11.3515 1.0177 11.6747 1.05166C11.9565 1.08129 12.2126 1.22912 12.3792 1.4584C12.5701 1.72127 12.5701 2.17598 12.5701 3.08542L12.5701 10.5332C12.5701 11.4427 12.5701 11.8974 12.3792 12.1603C12.2126 12.3895 11.9565 12.5374 11.6747 12.567C11.3515 12.601 10.9577 12.3736 10.1701 11.9189L3.72014 8.19497Z"
          fill={color}
        />
        <rect
          x="0.122833"
          y="0.308411"
          width="2.39461"
          height="13.0018"
          rx="1"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_5_145">
          <rect
            width="13"
            height="13"
            fill={color}
            transform="translate(0.122833 0.309326)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PrevIcon;
