const LogoIcon = ({ size = "32", color = "white", onClick = () => {} }) => {
  return (
    <svg
      width={size}
      height={(Number(size) * 33) / 76}
      viewBox="0 0 76 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M2.67505 30.1555C2.24179 30.1555 1.8687 30.1274 1.55579 30.0712C1.24288 30.0151 0.982117 29.9429 0.773509 29.8546V28.7233C1.00619 28.8116 1.28701 28.8838 1.61597 28.9399C1.94492 28.9961 2.28993 29.0242 2.65098 29.0242C3.30088 29.0242 3.83443 28.8958 4.25165 28.6391C4.66887 28.3823 4.97777 28.0012 5.17835 27.4957C5.37894 26.9902 5.47923 26.3644 5.47923 25.6182V8.13127H6.71884V25.5942C6.71884 26.5249 6.57041 27.3312 6.27354 28.0132C5.9847 28.7032 5.54341 29.2328 4.94968 29.6019C4.35595 29.9709 3.59774 30.1555 2.67505 30.1555ZM24.7594 12.3917C26.0191 12.3917 27.014 12.7568 27.7441 13.4869C28.4743 14.217 28.8393 15.3684 28.8393 16.941V25.7266H27.6479V16.9891C27.6479 15.7776 27.371 14.887 26.8174 14.3173C26.2638 13.7476 25.5337 13.4628 24.627 13.4628C23.3834 13.4628 22.4086 13.8279 21.7025 14.558C21.0045 15.2801 20.6555 16.4194 20.6555 17.976V25.7266H19.452V16.9891C19.452 16.1787 19.3236 15.5168 19.0668 15.0033C18.8181 14.4818 18.4691 14.0967 18.0198 13.8479C17.5705 13.5912 17.0409 13.4628 16.4312 13.4628C15.6208 13.4628 14.9187 13.6313 14.325 13.9683C13.7313 14.2972 13.274 14.8107 12.953 15.5088C12.6321 16.1988 12.4716 17.0773 12.4716 18.1445V25.7266H11.2561V12.6444H12.2429L12.4235 14.7867H12.4957C12.7123 14.3614 13.0012 13.9683 13.3622 13.6072C13.7233 13.2462 14.1686 12.9533 14.6981 12.7287C15.2357 12.504 15.8655 12.3917 16.5876 12.3917C17.5263 12.3917 18.3207 12.6043 18.9706 13.0295C19.6285 13.4468 20.0858 14.0686 20.3426 14.895H20.4268C20.7798 14.1087 21.3254 13.4949 22.0636 13.0536C22.8097 12.6123 23.7084 12.3917 24.7594 12.3917ZM36.5057 31.6478C34.8609 31.6478 33.5812 31.3309 32.6665 30.6971C31.7598 30.0632 31.3065 29.1766 31.3065 28.0373C31.3065 27.1547 31.5833 26.3925 32.1369 25.7506C32.6906 25.1168 33.4407 24.7357 34.3875 24.6073C34.0104 24.4308 33.7015 24.1901 33.4608 23.8852C33.2281 23.5803 33.1118 23.2273 33.1118 22.8261C33.1118 22.3768 33.2522 21.9596 33.533 21.5745C33.8138 21.1813 34.2351 20.8203 34.7967 20.4913C34.0425 20.2185 33.4488 19.7572 33.0155 19.1073C32.5822 18.4493 32.3656 17.659 32.3656 16.7364C32.3656 15.8538 32.5542 15.0875 32.9313 14.4377C33.3084 13.7878 33.8419 13.2863 34.5319 12.9333C35.23 12.5722 36.0524 12.3917 36.9991 12.3917C37.288 12.3917 37.5487 12.3997 37.7814 12.4158C38.0221 12.4318 38.2427 12.4599 38.4433 12.5C38.6439 12.5321 38.8244 12.5762 38.9849 12.6324H43.2092V13.4989L40.5134 13.6794C40.8664 14.1047 41.1312 14.566 41.3077 15.0635C41.4842 15.5529 41.5724 16.0704 41.5724 16.616C41.5724 17.9158 41.1633 18.9468 40.3449 19.709C39.5265 20.4712 38.3872 20.8524 36.9269 20.8524C36.5257 20.8524 36.1326 20.8162 35.7475 20.744C35.258 21.0329 34.885 21.3257 34.6282 21.6226C34.3715 21.9114 34.2431 22.2725 34.2431 22.7058C34.2431 22.9786 34.3233 23.2032 34.4838 23.3797C34.6442 23.5482 34.8769 23.6806 35.1818 23.7769C35.4867 23.8651 35.8598 23.9093 36.3011 23.9093H38.5998C40.0199 23.9093 41.1071 24.1981 41.8613 24.7758C42.6155 25.3535 42.9926 26.204 42.9926 27.3272C42.9926 28.6992 42.4269 29.7623 41.2956 30.5165C40.1724 31.2707 38.5757 31.6478 36.5057 31.6478ZM36.5899 30.6248C37.7373 30.6248 38.6921 30.5005 39.4543 30.2518C40.2245 30.003 40.8022 29.634 41.1873 29.1445C41.5724 28.6631 41.765 28.0654 41.765 27.3513C41.765 26.7656 41.6246 26.3123 41.3438 25.9913C41.063 25.6704 40.6658 25.4498 40.1523 25.3294C39.6388 25.201 39.033 25.1368 38.335 25.1368H36.1446C35.4466 25.1368 34.8248 25.2331 34.2792 25.4257C33.7336 25.6102 33.3084 25.9071 33.0035 26.3163C32.7066 26.7255 32.5582 27.2711 32.5582 27.9531C32.5582 28.8276 32.8992 29.4895 33.5812 29.9388C34.2712 30.3962 35.2741 30.6248 36.5899 30.6248ZM36.975 19.8775C38.0582 19.8775 38.8886 19.6047 39.4663 19.0591C40.044 18.5135 40.3328 17.7232 40.3328 16.6882C40.3328 15.581 40.036 14.7506 39.4422 14.197C38.8485 13.6433 38.0181 13.3665 36.951 13.3665C35.916 13.3665 35.1016 13.6634 34.5079 14.2571C33.9221 14.8428 33.6293 15.6692 33.6293 16.7364C33.6293 17.7313 33.9101 18.5055 34.4717 19.0591C35.0334 19.6047 35.8678 19.8775 36.975 19.8775Z"
        fill={color}
      />
      <path
        d="M48.9242 21.3222C48.5672 21.3222 48.2502 21.3924 47.9734 21.5329C47.7006 21.6692 47.47 21.8678 47.2814 22.1286C47.0969 22.3893 46.9565 22.7043 46.8602 23.0733C46.7639 23.4424 46.7158 23.8576 46.7158 24.319C46.7158 24.9408 46.792 25.4723 46.9444 25.9136C47.1009 26.3509 47.3416 26.6859 47.6665 26.9186C47.9915 27.1472 48.4107 27.2616 48.9242 27.2616C49.2812 27.2616 49.6383 27.2214 49.9953 27.1412C50.3564 27.061 50.7475 26.9466 51.1687 26.7982V28.3628C50.7796 28.5232 50.3965 28.6376 50.0194 28.7058C49.6423 28.778 49.2191 28.8141 48.7497 28.8141C47.843 28.8141 47.0969 28.6275 46.5112 28.2544C45.9295 27.8773 45.4982 27.3518 45.2174 26.6778C44.9366 25.9999 44.7962 25.2096 44.7962 24.3069C44.7962 23.641 44.8864 23.0312 45.067 22.4776C45.2475 21.924 45.5123 21.4446 45.8613 21.0394C46.2103 20.6342 46.6415 20.3213 47.155 20.1007C47.6685 19.88 48.2583 19.7697 48.9242 19.7697C49.3615 19.7697 49.7987 19.8259 50.236 19.9382C50.6773 20.0465 51.0985 20.197 51.4997 20.3895L50.898 21.9059C50.569 21.7495 50.238 21.6131 49.9051 21.4967C49.5721 21.3804 49.2451 21.3222 48.9242 21.3222ZM59.0156 25.3179C59.0156 25.8795 58.9394 26.377 58.787 26.8102C58.6385 27.2435 58.4199 27.6106 58.131 27.9114C57.8462 28.2083 57.5012 28.433 57.096 28.5854C56.6949 28.7379 56.2415 28.8141 55.7361 28.8141C55.2627 28.8141 54.8274 28.7379 54.4303 28.5854C54.0371 28.433 53.6941 28.2083 53.4013 27.9114C53.1124 27.6106 52.8878 27.2435 52.7273 26.8102C52.5708 26.377 52.4926 25.8795 52.4926 25.3179C52.4926 24.5717 52.625 23.9399 52.8898 23.4224C53.1545 22.9048 53.5316 22.5117 54.0211 22.2429C54.5105 21.9741 55.0942 21.8397 55.7722 21.8397C56.402 21.8397 56.9596 21.9741 57.445 22.2429C57.9345 22.5117 58.3176 22.9048 58.5944 23.4224C58.8752 23.9399 59.0156 24.5717 59.0156 25.3179ZM54.3641 25.3179C54.3641 25.7592 54.4122 26.1303 54.5085 26.4311C54.6048 26.732 54.7552 26.9587 54.9598 27.1111C55.1644 27.2636 55.4312 27.3398 55.7601 27.3398C56.0851 27.3398 56.3478 27.2636 56.5484 27.1111C56.753 26.9587 56.9015 26.732 56.9937 26.4311C57.09 26.1303 57.1381 25.7592 57.1381 25.3179C57.1381 24.8726 57.09 24.5035 56.9937 24.2107C56.9015 23.9138 56.753 23.6911 56.5484 23.5427C56.3438 23.3943 56.0771 23.3201 55.7481 23.3201C55.2627 23.3201 54.9096 23.4865 54.689 23.8195C54.4724 24.1525 54.3641 24.6519 54.3641 25.3179ZM62.6622 28.8141C61.9121 28.8141 61.3003 28.5212 60.8269 27.9355C60.3575 27.3458 60.1228 26.4813 60.1228 25.342C60.1228 24.1906 60.3615 23.3201 60.8389 22.7303C61.3163 22.1366 61.9401 21.8397 62.7104 21.8397C63.0313 21.8397 63.3142 21.8839 63.5589 21.9721C63.8036 22.0604 64.0142 22.1787 64.1907 22.3272C64.3712 22.4756 64.5237 22.6421 64.648 22.8266H64.7082C64.6841 22.6982 64.6541 22.5097 64.618 22.261C64.5859 22.0082 64.5698 21.7495 64.5698 21.4847V19.3304H66.4112V28.6937H65.0031L64.648 27.8212H64.5698C64.4535 28.0057 64.307 28.1742 64.1305 28.3267C63.958 28.4751 63.7514 28.5934 63.5107 28.6817C63.27 28.7699 62.9872 28.8141 62.6622 28.8141ZM63.3061 27.3518C63.8076 27.3518 64.1606 27.2034 64.3652 26.9065C64.5738 26.6056 64.6841 26.1543 64.6962 25.5526V25.354C64.6962 24.7001 64.5959 24.2006 64.3953 23.8556C64.1947 23.5066 63.8216 23.3321 63.276 23.3321C62.8709 23.3321 62.5539 23.5066 62.3253 23.8556C62.0966 24.2046 61.9823 24.7081 61.9823 25.366C61.9823 26.0239 62.0966 26.5194 62.3253 26.8524C62.5579 27.1853 62.8849 27.3518 63.3061 27.3518ZM71.1049 21.8397C71.7267 21.8397 72.2622 21.9601 72.7115 22.2008C73.1609 22.4375 73.5079 22.7825 73.7526 23.2358C73.9973 23.6891 74.1197 24.2428 74.1197 24.8967V25.7873H69.781C69.8011 26.3048 69.9555 26.7119 70.2444 27.0088C70.5372 27.3017 70.9424 27.4481 71.4599 27.4481C71.8891 27.4481 72.2823 27.404 72.6393 27.3157C72.9964 27.2275 73.3634 27.0951 73.7405 26.9186V28.3387C73.4076 28.5032 73.0586 28.6235 72.6935 28.6997C72.3324 28.776 71.8932 28.8141 71.3757 28.8141C70.7017 28.8141 70.1039 28.6897 69.5824 28.441C69.0649 28.1923 68.6577 27.8132 68.3609 27.3037C68.068 26.7942 67.9216 26.1523 67.9216 25.3781C67.9216 24.5918 68.054 23.9379 68.3187 23.4163C68.5875 22.8908 68.9606 22.4977 69.438 22.2369C69.9154 21.9721 70.471 21.8397 71.1049 21.8397ZM71.1169 23.1456C70.7599 23.1456 70.463 23.2599 70.2263 23.4886C69.9936 23.7172 69.8592 24.0763 69.8231 24.5657H72.3986C72.3946 24.2929 72.3445 24.0502 72.2482 23.8376C72.1559 23.6249 72.0155 23.4565 71.827 23.3321C71.6424 23.2077 71.4057 23.1456 71.1169 23.1456Z"
        fill={color}
      />
      <path
        d="M48.6336 18.0875L44.4508 16.2426V15.6402L48.6336 13.5509V14.5619L45.7524 15.8971L48.6336 17.0808V18.0875ZM52.5383 12.7843L50.2426 18.9426H49.0758L51.3715 12.7843H52.5383ZM52.9511 17.0808L55.8323 15.8971L52.9511 14.5619V13.5509L57.1339 15.6402V16.2426L52.9511 18.0875V17.0808Z"
        fill={color}
      />
    </svg>
  );
};

export default LogoIcon;