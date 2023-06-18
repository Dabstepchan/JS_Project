export function sortObjects(objects, property) {
  return objects.sort((a, b) => {
    const valueA = getProperty(a, property);
    const valueB = getProperty(b, property);

    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
  });
}

function getProperty(object, property) {
  const properties = property.split('.');
  let value = object;

  for (let prop of properties) {
    value = value[prop];
  }

  return value;
}

export function filterObjects(objects, criteria) {
  return objects.filter((object) => {
    for (let key in criteria) {
      if (object[key] !== criteria[key]) {
        return false;
      }
    }
    return true;
  });
}

export function getRandomElements(array, count) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}