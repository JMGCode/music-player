const RepeatIcon = ({
  type = "off",
  size = "32",
  color = "white",
  onClick = () => {},
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g clipPath="url(#clip0_59_96)">
        {type === "track" ? (
          <>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.79738 2.45248H11.2026V0.456726H12.8385C15.0476 0.456726 16.8385 2.24759 16.8385 4.45673V8.73203C16.8385 10.9412 15.0476 12.732 12.8385 12.732H12.0879V14.6772L7.08795 11.7904L8.9118 10.7374H5.15567V12.732H4.16149C1.95235 12.732 0.161484 10.9412 0.161484 8.73204V4.45673C0.161484 2.24759 1.95234 0.456726 4.16148 0.456726H5.79738V2.45248ZM12.8385 10.732H12.0879V8.90368L8.92114 10.732H4.16149C3.05691 10.732 2.16148 9.83661 2.16148 8.73204V4.45673C2.16148 3.35216 3.05692 2.45673 4.16148 2.45673H12.8385C13.9431 2.45673 14.8385 3.35216 14.8385 4.45673V8.73203C14.8385 9.83661 13.9431 10.732 12.8385 10.732Z"
              fill={color}
            />
            <path
              d="M7.69994 8.75073V2.12964C7.58275 2.26961 7.42162 2.38354 7.21654 2.47144C7.01146 2.55607 6.81777 2.59839 6.63548 2.59839V1.22632C6.80801 1.20028 6.99356 1.14494 7.19212 1.0603C7.39069 0.972412 7.57461 0.853597 7.74388 0.703857C7.91641 0.550863 8.04824 0.366943 8.13939 0.1521H9.52122V8.75073H7.69994Z"
              fill={color}
            />
          </>
        ) : (
          <>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.1615 2.45673H12.8385C13.9431 2.45673 14.8385 3.35216 14.8385 4.45673V8.73203C14.8385 9.83661 13.9431 10.732 12.8385 10.732H4.1615C3.05693 10.732 2.1615 9.83661 2.1615 8.73204V4.45673C2.1615 3.35216 3.05693 2.45673 4.1615 2.45673ZM0.161499 4.45673C0.161499 2.24759 1.95236 0.456726 4.1615 0.456726H12.8385C15.0476 0.456726 16.8385 2.24759 16.8385 4.45673V8.73203C16.8385 10.9412 15.0476 12.732 12.8385 12.732H11.6872V10.7374H5.15569V12.732H4.1615C1.95236 12.732 0.161499 10.9412 0.161499 8.73204V4.45673Z"
              fill={color}
            />
            <path
              d="M7.08796 11.7904L12.088 14.6772V8.90368L7.08796 11.7904ZM12.4921 11.2904H11.588V12.2904H12.4921V11.2904Z"
              fill={color}
            />
          </>
        )}
      </g>
      <defs>
        <clipPath id="clip0_59_96">
          <rect width="17" height="15" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RepeatIcon;