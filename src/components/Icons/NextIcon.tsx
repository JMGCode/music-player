const NextIcon = ({ size = "32", color = "white", onClick = () => {} }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g clipPath="url(#clip0_5_149)">
        <path
          d="M9.03964 5.6143C9.82738 6.06903 10.2213 6.29639 10.3534 6.59324C10.4687 6.85216 10.4687 7.14784 10.3534 7.40676C10.2213 7.70361 9.82738 7.93097 9.03964 8.3857L2.58817 12.1098C1.8006 12.5645 1.40682 12.7918 1.08369 12.7578C0.80185 12.7282 0.545816 12.5803 0.379244 12.3511C0.188273 12.0882 0.188273 11.6335 0.188273 10.7241L0.188273 3.27586C0.188273 2.36649 0.188273 1.91181 0.379243 1.64895C0.545816 1.41967 0.801849 1.27184 1.08369 1.2422C1.40682 1.20822 1.8006 1.43554 2.58817 1.89016L9.03964 5.6143Z"
          fill={color}
        />
        <rect
          x="12.6376"
          y="13.5009"
          width="2.39501"
          height="13.0018"
          rx="1"
          transform="rotate(180 12.6376 13.5009)"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_5_149">
          <rect
            width="13"
            height="14"
            fill={color}
            transform="translate(0.122833)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default NextIcon;
