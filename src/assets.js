export const images = {};

const MANIFEST = {
  title: 'assets/images/title.webp',
  paintingHall: 'assets/images/painting_ballroom.jpg',
  paintingStairs: 'assets/images/painting_stairs.jpg',
  paintingCorridor: 'assets/images/painting_corridor.jpg',
  paintingGraveyard: 'assets/images/painting_graveyard.jpg',
  paintingHouse: 'assets/images/painting_house.jpg',
  handprint: 'assets/images/handprint.png',
};

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

export async function loadAssets(onProgress) {
  const keys = Object.keys(MANIFEST);
  let done = 0;
  await Promise.all(
    keys.map(async (k) => {
      try {
        images[k] = await loadImage(MANIFEST[k]);
      } catch (err) {
        console.warn(err.message);
        images[k] = null;
      }
      done++;
      onProgress?.(done / keys.length);
    }),
  );
}
