import { getMarsPhotos } from './api.js';

class MarsPhotoGallery {
  constructor() {
    this.marsPhotoGalleryElement = document.getElementById('mars-photo-gallery');
    this.marsPhotoAccordionHeader = document.querySelector('.accordion-header-2');
    this.marsPhotoModalElement = document.getElementById('mars-photo-modal');
    this.marsPhotoModalImageElement = document.getElementById('mars-photo-modal-image');
    this.marsPhotoModalCloseButton = document.getElementById('mars-photo-modal-close');
    this.currentPhotoIndex = 0;
    this.photos = [];

    this.closeAccordion();
  }

  openAccordion() {
    this.marsPhotoGalleryElement.style.display = 'block';
  }

  closeAccordion() {
    this.marsPhotoGalleryElement.style.display = 'none';
  }

  toggleAccordion() {
    if (this.marsPhotoGalleryElement.style.display === 'none') {
      this.openAccordion();
    } else {
      this.closeAccordion();
    }
  }

  showNextPhoto() {
    this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.photos.length;
    this.displayPhotoModal(this.photos[this.currentPhotoIndex]);
  }

  showPreviousPhoto() {
    this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.photos.length) % this.photos.length;
    this.displayPhotoModal(this.photos[this.currentPhotoIndex]);
  }

  displayPhotoModal(photo) {
    this.marsPhotoModalImageElement.src = photo.img_src;
    this.marsPhotoModalElement.style.display = 'flex';
  }

  closePhotoModal() {
    this.marsPhotoModalElement.style.display = 'none';
  }

  initializeEventListeners() {
    this.marsPhotoModalCloseButton.addEventListener('click', this.closePhotoModal.bind(this));
    this.marsPhotoModalElement.addEventListener('click', (event) => {
      if (event.target === this.marsPhotoModalElement) {
        this.closePhotoModal();
      }
    });
    this.marsPhotoModalImageElement.addEventListener('click', (event) => {
      event.stopPropagation();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        this.showPreviousPhoto();
      } else if (event.key === 'ArrowRight') {
        this.showNextPhoto();
      }
    });

    this.marsPhotoAccordionHeader.addEventListener('click', this.toggleAccordion.bind(this));
  }

  async fetchAndDisplayMarsPhotos() {
    try {
      this.photos = await getMarsPhotos(16);

      if (this.photos.length > 0) {
        this.photos.forEach((photo) => {
          const thumbnailElement = document.createElement('img');
          thumbnailElement.src = photo.img_src;
          thumbnailElement.alt = 'Mars Photo';
          thumbnailElement.classList.add('thumbnail');

          thumbnailElement.addEventListener('click', () => {
            this.currentPhotoIndex = this.photos.indexOf(photo);
            this.displayPhotoModal(photo);
          });

          this.marsPhotoGalleryElement.appendChild(thumbnailElement);
        });
      } else {
        this.marsPhotoGalleryElement.textContent = 'Не удалось получить фото с Марса';
      }
    } catch (error) {
      console.error(error);
      this.marsPhotoGalleryElement.textContent = 'Произошла ошибка при загрузке фото с Марса';
    }
  }

  initialize() {
    this.marsPhotoModalElement.style.display = 'none';
    this.initializeEventListeners();
    this.fetchAndDisplayMarsPhotos();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('nameInput');
  const nextButton = document.getElementById('nextButton');
  const marsAccordion = document.getElementById('marsAccordion');

  nextButton.addEventListener('click', () => {
    const name = nameInput.value.trim();

    if (name !== '') {
      marsAccordion.style.display = 'block';
      const marsPhotoGallery = new MarsPhotoGallery();
      marsPhotoGallery.initialize();
    }
  });
});
