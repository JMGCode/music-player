export const getRandColorFromStr = (input: string) => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = [0, 0, 0];
  let colours = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;

    colour[i] = value;
    colours[i] = Math.floor((value * 64) / 255);
  }

  //hsla h = 169 - 360 s=100  l = 50(light) => 25(dark)
  const h = colours.reduce((acc, curr) => {
    acc += 120 - curr;
    return acc;
  }, 0);

  const [red, green, blue] = colour;

  return { red, green, blue, h };
};
