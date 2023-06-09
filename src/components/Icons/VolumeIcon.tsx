const VolumeIcon = ({
  size = "32",
  color = "white",
  onClick = () => {},
  value = 0,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g clipPath="url(#clip0_29_45)">
        <path
          d="M2.4005 7.40422C1.61276 6.9495 1.21889 6.72213 1.08672 6.42529C0.971427 6.16637 0.971427 5.87068 1.08672 5.61176C1.21889 5.31491 1.61276 5.08755 2.4005 4.63283L8.85197 0.908686C9.63954 0.454059 10.0333 0.226746 10.3564 0.260724C10.6383 0.290362 10.8943 0.438195 11.0609 0.667473C11.2519 0.930333 11.2519 1.38502 11.2519 2.29439L11.2519 9.74266C11.2519 10.652 11.2519 11.1067 11.0609 11.3696C10.8943 11.5989 10.6383 11.7467 10.3564 11.7763C10.0333 11.8103 9.63954 11.583 8.85197 11.1284L2.4005 7.40422Z"
          fill={color}
        />
        {value >= 80 && (
          <path
            d="M12.5319 11.0935C15.2608 11.0935 17.4731 8.82137 17.4731 6.01854C17.4731 3.21571 15.2608 0.943573 12.5319 0.943573"
            stroke={color}
          />
        )}

        {value >= 45 && (
          <path
            d="M12.5319 9.39286C14.3464 9.39286 15.8173 7.88212 15.8173 6.01853C15.8173 4.15494 14.3464 2.6442 12.5319 2.6442"
            stroke={color}
          />
        )}
        {value !== 0 && (
          <path
            d="M12.5319 7.75443C13.4653 7.75443 14.222 6.97725 14.222 6.01856C14.222 5.05986 13.4653 4.28268 12.5319 4.28268"
            stroke={color}
          />
        )}

        {value === 0 && (
          <path
            d="M12.1639 7.64994L16.1904 3.72214L16.8569 4.40544L12.8304 8.33323L12.1639 7.64994ZM12.2049 4.34769L12.8882 3.68115L16.8159 7.70769L16.1327 8.37423L12.2049 4.34769Z"
            fill={color}
          />
        )}
        <rect
          x="0.686417"
          y="3.62363"
          width="5.36711"
          height="4.75275"
          rx="1"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_29_45">
          <rect width="18" height="12" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default VolumeIcon;
