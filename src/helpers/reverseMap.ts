const reverseMap = (value: Map<string, any>) => {
  const arr = Array.from(value);
  const revArr = arr.reverse();
  return new Map(revArr);
};

export default reverseMap;
