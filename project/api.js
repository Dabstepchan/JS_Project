import { getRandomElements } from './utils.js';

const apiKey = 'nSexfMzPMbln83HkIvsik1h6Hg9uP8qERwNMJ1Rw';

export async function getAstronomyContentOfTheDay() {
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAsteroids() {
  const apiUrl = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data.near_earth_objects;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMarsPhotos(count) {
  const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`);
  const data = await response.json();
  const photos = data.photos;

  const randomPhotos = getRandomElements(photos, count);

  return randomPhotos;
}
