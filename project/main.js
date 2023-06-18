import { astronomyPictureUI } from './ui.js';
import { AsteroidsUI } from './asteroids-ui.js';

document.addEventListener('DOMContentLoaded', () => {
  astronomyPictureUI.handleUserInteraction();

  const asteroidsUIInstance = new AsteroidsUI();
  asteroidsUIInstance.handleAsteroidsInteraction();
});
