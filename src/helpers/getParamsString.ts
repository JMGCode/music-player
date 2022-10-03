export const getParamsString = (input: Object) => {
  const objArr = Object.entries(input);
  const lastIndex = objArr.length - 1;

  return Object.entries(input).reduce((acc, curr, index) => {
    if (index === 0) acc += "?";
    acc += `${curr[0]}=${curr[1]}`;
    if (index !== lastIndex) acc += "&";
    return acc;
  }, "");
};
