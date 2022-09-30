export const getTimeString = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  seconds = seconds - hours * 3600;
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds - minutes * 60);

  if (hours > 0) {
    const m = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${m}`;
  }

  const s = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${s}`;
};
