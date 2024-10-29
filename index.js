ymaps.ready(init);
let map;
const centerCoords = [42.11055971, 48.20634499];
// Coordonnées statiques pour les icônes de personnes
const personCoordinates = [
  [42.111, 48.207],
  [42.112, 48.206],
  [42.109, 48.208],
  [42.113, 48.205],
  [42.108, 48.209],
  [42.11, 48.204],
  [42.114, 48.203],
  [42.107, 48.21],
  [42.115, 48.202],
  [42.106, 48.211],
  [42.109, 48.201],
  [42.116, 48.2],
  [42.105, 48.212],
  [42.117, 48.199],
  [42.104, 48.213],
  [42.118, 48.198],
  [42.103, 48.214],
  [42.119, 48.197],
  [42.102, 48.215],
  [42.12, 48.196],
];
function init() {
  map = new ymaps.Map('map', {
    center: centerCoords,
    zoom: 15,
    // type: 'yandex#satellite',
    // Карта будет создана без
    // элементов управления.
    controls: ['zoomControl'],
    behaviors: ['drag'],
  });

  document
    .getElementById('fileInput')
    .addEventListener('change', handleFileSelect, false);

  // Add people to map
  addPersonIconToMap(personCoordinates);
}

function handleFileSelect(event) {
  const file = event.target.files[0];

  if (!file) return;

  if (file.name.endsWith('.csv')) {
    Papa.parse(file, {
      header: true,
      complete: function (results) {
        const data = results.data;
        addPlacesToMap(data);
      },
      error: function (error) {
        console.error('Error to uploaded file csv: ', error);
      },
    });
  } else if (file.name.endsWith('.xlsx')) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const coordinatesData = jsonData.slice(1).map((row) => {
        const latitude = parseFloat(
          row[0].toString().replace(',', '.')
        );
        const longitude = parseFloat(
          row[1].toString().replace(',', '.')
        );
        const hintContent = row[3] || 'No Content';

        return {
          latitude: latitude,
          longitude: longitude,
          hintContent: hintContent,
        };
      });
      addPlacesToMap(coordinatesData);
    };
    reader.readAsArrayBuffer(file);
  }
}

function addPlacesToMap(coordinates) {
  coordinates.forEach((place, index) => {
    const latitude = parseFloat(place.latitude);
    const longitude = parseFloat(place.longitude);
    const hintContent = place.hintContent;

    if (!isNaN(latitude) && !isNaN(longitude)) {
      let iconUrl =
        index === 0 ? './assets/rectangle.svg' : './assets/close.svg';
      const placeMark = new ymaps.Placemark(
        [latitude, longitude],
        {
          hintContent: `<div>${hintContent}</div>`,
        },
        {
          iconLayout: 'default#image',
          iconImageHref: iconUrl,
          iconImageSize: [20, 20],
          iconImageOffset: [-20, -20],
        }
      );
      map.geoObjects.add(placeMark);
    }
  });
}

function addPersonIconToMap(personCoords) {
  personCoords.forEach((coords, index) => {
    const personPlacemark = new ymaps.Placemark(
      coords,
      {
        hintContent: `<div>Person ${index}</div>`,
      },
      {
        iconLayout: 'default#image',
        iconImageHref: './assets/people.png',
        iconImageSize: [10, 10],
        iconImageOffset: [-15, -15],
      }
    );
    map.geoObjects.add(personPlacemark);
  });
}

// function generateRandomCoordinates(center, count, range) {
//   const [lat, long] = center;
//   const coords = [];
//   for (let i = 0; i < count; i++) {
//     const randomLat = lat + (Math.random() - 0.5) * range;
//     const randomLong = long + (Math.random() - 0.5) * range;
//     coords.push(randomLat, randomLong);
//   }
//   return coords;
// }
