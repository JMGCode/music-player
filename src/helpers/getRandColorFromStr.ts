export const getRandColorFromStr = (input: string) => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = [0, 0, 0];
  let colours = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;

    // console.log("values1: ", value);
    // console.log("values2: ", value * 64);
    // console.log("values3: ", (value * 64) / 255);

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

/*
  4 7
  1 2 3 4 5 6 7 8 9 10
r= 4 5 6 7

  8 3
  1 2 3 4 5 6 7 8 9 10
r= 8 9 10 1 2 3 == (8 - 13)% 10


  if max < min  = max -> maxArr + min
  else min -> max



  255 = 120

  
 Interpolacion 
 fx0 + (fx1-fx0/x1-x0)*(x-x0)

 x0 = 0    fx0 = min
 x1 = 255  fx1 = max


 0 1 2 3 4 5 6 7 8 9
 min 8 max 3

0 a 9  = 0 a 255 , la function nos da un valor de estos
y limitamos los valores 

valores de 0 - 120


x0 =  0    f0 = 0
x1 =  255  f1 = 120


limit min 200 max 300
x0 = 0     f0 = 200/3 = 66.66
x1 = 255   f1 = 300/3 = 100
x = 100 <= este es de 0 - 255

fx0 + (fx1-fx0/x1-x0)*(x-x0)
66.66 + (100 - 66.66 / 255 - 0 ) * 100
66.66 + (33.34 / 255) * (100)
66.66 + (0.13*100) = 79.66


x=255

66.66 + (0.13 * 255) 
66.66 + 33.15 =  99.81
nota : utilizar todos los decimales y redondar solo al final de cada valor
*/

export const getRandColorFromStrs = (
  input: string,
  limit?: { min: number; max: number }
) => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = [0, 0, 0];
  let colours = [0, 0, 0];

  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff; // 0 - 255
    if (limit) {
      colour[i] = value;
      const minInterpol = interpolate({
        x: limit.min,
        f0: 0,
        f1: 255,
        x0: 0,
        x1: 360,
      });
      const maxInterpol = interpolate({
        x: limit.max,
        f0: 0,
        f1: 255,
        x0: 0,
        x1: 360,
      });

      // 0 + (255)/(360) * (100)
      // 0.7083 * 100 = 70.83

      let newValue = getValueWithLimits({
        value,
        lmin: minInterpol,
        lmax: maxInterpol,
        maxValue: 360,
      });

      // console.log("dec newValue:  ", Math.floor((newValue * 120) / 255));
      // console.log("max newValue:  ", Math.floor((255 * 120) / 255));

      colours[i] = Math.floor((value * 64) / 255);
    } else {
      colour[i] = value;
      colours[i] = Math.floor((value * 64) / 255);
    }
  }

  //hsla h = 169 - 360 s=100  l = 50(light) => 25(dark)
  const h = colours.reduce((acc, curr) => {
    acc += 120 - curr;
    return acc;
  }, 0);

  const [red, green, blue] = colour;

  return { red, green, blue, h };
};

const getLimitedValue = (value: number, min: number, max: number) => {
  //
};

//x = 0-255 que se transforma a 0 -360
const interpolate = ({
  x,
  f0,
  f1,
  x0,
  x1,
}: {
  x: number;
  f0: number;
  f1: number;
  x0: number;
  x1: number;
}) => {
  return f0 + ((f1 - f0) / (x1 - x0)) * (x - x0);
};

/**
 * from an array of n number only takes values from the limits
 * arr 0 - 255 , min: 10 max:50 => 250 = 13
 * if min > max means that values between min - max are ignored
 * arr 0 - 10 , max:2 min:5 only values from 5-10 and 1-2 are valid
 * 1 2 3 4 5 6 7 8 9
 * value 14 = 2
 */
const getValueWithLimits = ({
  value,
  lmin,
  lmax,
  maxValue,
}: {
  value: number;
  lmin: number;
  lmax: number;
  maxValue: number;
}) => {
  if (lmin < lmax) {
    const base = lmin - 1;
    const rbase = lmax - lmin + 1;
    const rNum = Math.ceil(value / rbase);
    const nValue = (value + rNum * base) % lmax;

    if (nValue === 0) return lmax;
    return nValue;
  } else {
    const base = lmin - lmax - 1;
    const rbase = maxValue + 1 - lmin + lmax;
    const rNum = Math.ceil(value / rbase);
    const nValue = (lmax + rNum * base + value) % maxValue;

    if (nValue === 0) return maxValue;
    return nValue;
  }
};
