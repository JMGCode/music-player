export const getParamsString = (input: Object) => {
  const objArr = Object.entries(input);
  const lastIndex = objArr.length - 1;

  return Object.entries(input).reduce((acc, curr, index) => {
    if (!curr[1]) return acc;
    if (index === 0) acc += "?";
    acc += `${curr[0]}=${curr[1]}`;
    if (index !== lastIndex && objArr[index + 1][1] !== undefined) acc += "&";
    return acc;
  }, "");
};
