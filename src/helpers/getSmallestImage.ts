export const getSmallestImage = (images: SpotifyApi.ImageObject[]) => {
  return images.reduce((smallest, image) => {
    const imH = image.height || 0;
    const smH = smallest.height || 0;
    if (imH < smH) return image;
    return smallest;
  }, images[0]);
};
