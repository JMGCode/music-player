const getArrayFromMap = (value: Map<string, any>) => {
  const aa = Array.from(value);
  const arr = aa.map((v) => {
    return v[1];
  });

  return arr;
};

export default getArrayFromMap;
