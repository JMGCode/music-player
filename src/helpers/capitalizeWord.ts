export function capitalize(word: string) {
  return word
    .toLowerCase()
    .replace(/\w/, (firstLetter) => firstLetter.toUpperCase());
}

export function capitalizeWords(input: string) {
  return input
    .replace("_", " ")
    .split(" ")
    .reduce((acc, curr, index, arr) => {
      acc += capitalize(curr);
      if (index !== arr.length - 1) {
        acc += " ";
      }
      return acc;
    }, "");
}
