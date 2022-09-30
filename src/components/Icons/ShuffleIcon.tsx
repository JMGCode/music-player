const ShuffleIcon = ({ size = "32", color = "white", onClick = () => {} }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g clipPath="url(#clip0_5_159)">
        <path
          d="M16.7919 3.13875L11.75 0.325824L11.8348 6.0987L16.7919 3.13875ZM0.442566 12.1542C3.65251 12.1542 5.57724 10.3075 7.22914 8.38574C8.06988 7.40764 8.81614 6.44079 9.66442 5.58642C10.501 4.74385 11.3918 4.06088 12.4625 3.67533L12.1237 2.73447C10.8608 3.18925 9.84761 3.98261 8.95478 4.88185C8.07367 5.7693 7.26516 6.80974 6.47079 7.73389C4.85245 9.61662 3.18552 11.1542 0.442566 11.1542L0.442566 12.1542Z"
          fill={color}
        />
        <path
          d="M0.204742 11.6543C7.71046 11.6543 6.16593 1.12889 15.0113 3.39372"
          stroke={color}
          strokeWidth="2"
        />
        <path
          d="M16.7953 9.75916L11.8151 6.83827L11.7756 12.6116L16.7953 9.75916ZM0.433779 1.84577C3.18026 1.84575 4.85866 3.37703 6.48299 5.24662C7.28022 6.16423 8.09123 7.19736 8.97122 8.07662C9.86306 8.96774 10.8727 9.75287 12.1274 10.1994L12.4627 9.25732C11.4008 8.87939 10.5139 8.20445 9.67803 7.36923C8.83027 6.52216 8.0823 5.56269 7.23787 4.59077C5.57889 2.68129 3.64331 0.845752 0.433774 0.845766L0.433779 1.84577Z"
          fill={color}
        />
        <path
          d="M0.227736 1.34577C7.75036 1.34573 6.18602 11.9426 14.9745 9.6255"
          stroke={color}
          strokeWidth="2"
        />
      </g>
      <defs>
        <clipPath id="clip0_5_159">
          <rect width="17" height="13" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ShuffleIcon;