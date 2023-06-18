import { getAsteroids } from './api.js';
import { sortObjects, filterObjects } from './utils.js';

export class AsteroidsUI {
  constructor() {
    this.asteroidsData = [];
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
    } catch (error) {
      console.error('Ошибка при загрузке списка астероидов:', error);
    }
  }

  handleAsteroidsInteraction() {
    const hazardousCheckbox = document.getElementById('hazardousCheckbox');
    const sortCriteriaSelect = document.getElementById('sortCriteriaSelect');
    const createTableButton = document.getElementById('createTableButton');

    hazardousCheckbox.addEventListener('change', () => {
      this.displayAsteroids();
    });

    sortCriteriaSelect.addEventListener('change', () => {
      this.displayAsteroids();
    });

    createTableButton.addEventListener('click', () => {
      this.fetchAsteroids();
    });

    sortCriteriaSelect.addEventListener('change', () => {
      if (sortCriteriaSelect.value === 'size') {
        this.displayAsteroids();
      }
    });
  }
}
