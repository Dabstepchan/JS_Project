import { getAsteroids } from './api.js';
import { sortObjects, filterObjects } from './utils.js';

export class AsteroidsUI {
  constructor() {
    this.asteroidsData = [];
    this.handleAsteroidsInteraction();
  }

  async fetchAsteroids() {
    try {
      this.asteroidsData = await getAsteroids();
      this.displayAsteroids();
    } catch (error) {
      console.error('Ошибка при загрузке списка астероидов:', error);
    }
  }

  displayAsteroids() {
    try {
      const asteroids = this.asteroidsData;
      const asteroidsAccordion = document.getElementById('asteroidsAccordion');
      const asteroidsTable = document.getElementById('asteroidsTable');
      const sortCriteriaSelect = document.getElementById('sortCriteriaSelect');
      const tbody = asteroidsTable.querySelector('tbody');
      tbody.innerHTML = '';

      const hazardousCheckbox = document.getElementById('hazardousCheckbox');
      const showOnlyHazardous = hazardousCheckbox.checked;

      const filteredAsteroids = showOnlyHazardous
        ? filterObjects(asteroids, { is_potentially_hazardous_asteroid: true })
        : asteroids;

      const sortCriteria = sortCriteriaSelect.value;
      let sortedAsteroids = filteredAsteroids;
      if (sortCriteria === 'size') {
        sortedAsteroids = sortObjects(filteredAsteroids, 'estimated_diameter.kilometers.estimated_diameter_min');
      } else {
        sortedAsteroids = sortObjects(filteredAsteroids, 'name');
      }

      const thead = asteroidsTable.querySelector('thead');
      if (!thead) {
        const newThead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const nameHeader = document.createElement('th');
        const diameterHeader = document.createElement('th');

        nameHeader.textContent = 'Название';
        diameterHeader.textContent = 'Диаметр (км)';

        headerRow.appendChild(nameHeader);
        headerRow.appendChild(diameterHeader);
        newThead.appendChild(headerRow);
        asteroidsTable.appendChild(newThead);
      }

      sortedAsteroids.forEach((asteroid) => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const diameterCell = document.createElement('td');

        nameCell.textContent = asteroid.name;
        diameterCell.textContent = `${(asteroid.estimated_diameter.kilometers.estimated_diameter_min).toFixed(2)} - ${(asteroid.estimated_diameter.kilometers.estimated_diameter_max).toFixed(2)}`;

        row.appendChild(nameCell);
        row.appendChild(diameterCell);

        tbody.appendChild(row);
      });

      asteroidsAccordion.style.display = 'block';
    } catch (error) {
      console.error('Ошибка при загрузке списка астероидов:', error);
    }
  }

  handleAsteroidsInteraction() {
    const nameInput = document.getElementById('nameInput');
    const nextButton = document.getElementById('nextButton');
    const createTableButton = document.getElementById('createTableButton');
    const asteroidsAccordion = document.getElementById('asteroidsAccordion');

    let isAccordionOpen = false;

    nextButton.addEventListener('click', () => {
      const name = nameInput.value.trim();
      if (name !== '') {
        const welcomeSection = document.querySelector('.welcome');
        welcomeSection.style.display = 'none';
        asteroidsAccordion.style.display = 'block';
      }
    });

    createTableButton.addEventListener('click', () => {
      this.fetchAsteroids();
    });

    const accordionHeader = asteroidsAccordion.querySelector('.accordion-header');
    const accordionContent = asteroidsAccordion.querySelector('.accordion-content');
    const createTableButtonInsideAccordion = accordionContent.querySelector('#createTableButton');
    const asteroidsTable = document.getElementById('asteroidsTable');

    accordionHeader.addEventListener('click', () => {
      if (isAccordionOpen) {
        accordionContent.style.display = 'none';
        isAccordionOpen = false;
        asteroidsTable.style.display = 'none';
      } else {
        accordionContent.style.display = 'block';
        isAccordionOpen = true;
        asteroidsTable.style.display = 'block';
      }
    });

    createTableButtonInsideAccordion.addEventListener('click', () => {
      this.fetchAsteroids();
    });

    const hazardousCheckbox = document.getElementById('hazardousCheckbox');
    const sortCriteriaSelect = document.getElementById('sortCriteriaSelect');

    hazardousCheckbox.addEventListener('change', () => {
      this.displayAsteroids();
    });

    sortCriteriaSelect.addEventListener('change', () => {
      this.displayAsteroids();
    });
  }
}
