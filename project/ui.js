import { getAstronomyContentOfTheDay } from './api.js';

class AstronomyPictureUI {
  constructor() {
    this.apodContainerElement = document.getElementById('apodContainer');
    this.nameInputElement = document.getElementById('nameInput');
    this.nextButtonElement = document.getElementById('nextButton');
    this.headerElement = document.querySelector('header');
    this.welcomeSection = document.querySelector('.welcome');
  }

  displayAstronomyPictureContent(name, data) {
    const mediaType = data.media_type;
    const mediaTitle = data.title;
    const mediaExplanation = data.explanation;
    let mediaUrl;

    const apodContainer = document.createElement('div');
    apodContainer.classList.add('apod-container');

    this.headerElement.innerHTML = `<h1 class="header">Привет, ${name}!</h1>`;

    if (mediaType === 'image') {
      mediaUrl = data.url;
      const imageElement = document.createElement('img');
      imageElement.src = mediaUrl;
      imageElement.alt = mediaTitle;
      imageElement.classList.add('apod-media');
      apodContainer.appendChild(imageElement);

      // Add welcome message text
      const welcomeMessageElement = document.createElement('p');
      welcomeMessageElement.textContent = 'Приветственное изображение';
      apodContainer.appendChild(welcomeMessageElement);
    } else if (mediaType === 'video') {
      mediaUrl = data.url;
      const videoContainer = document.createElement('div');
      videoContainer.classList.add('apod-video-container');
      videoContainer.innerHTML = `<iframe width="100%" height="500" src="${mediaUrl}" frameborder="0" allowfullscreen></iframe>`;
      apodContainer.appendChild(videoContainer);
    }

    const titleElement = document.createElement('h3');
    titleElement.textContent = mediaTitle;
    apodContainer.appendChild(titleElement);

    const explanationElement = document.createElement('p');
    explanationElement.textContent = mediaExplanation;
    apodContainer.appendChild(explanationElement);

    this.apodContainerElement.innerHTML = '';
    this.apodContainerElement.appendChild(apodContainer);

    this.welcomeSection.style.display = 'none';
  }

  handleUserInteraction() {
    this.nextButtonElement.addEventListener('click', async () => {
      const name = this.nameInputElement.value.trim();
      if (name !== '') {
        try {
          const data = await getAstronomyContentOfTheDay();
          this.displayAstronomyPictureContent(name, data);
        } catch (error) {
          console.error('Ошибка при загрузке данных:', error);
        }
      }
    });
  }
}

const astronomyPictureUI = new AstronomyPictureUI();
export { astronomyPictureUI };
