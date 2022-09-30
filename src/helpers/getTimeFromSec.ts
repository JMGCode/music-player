export const getTimeFromSec = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  seconds = seconds - hours * 3600;
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds - minutes * 60);

  if (hours > 0) {
    return `${hours} hr ${minutes} min`;
  }
  return `${minutes} min ${seconds} sec`;
};
