/* exported data */
/* exported favorites */
let data = {
  nextEntryId: 0,
  library: []
};

let favorites = [];

window.addEventListener('beforeunload', saveData);
pullData();

function saveData(event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('dataEntries', dataJSON);
  const favoritesJSON = JSON.stringify(favorites);
  localStorage.setItem('favoritesEntries', favoritesJSON);
}

function pullData(event) {
  const savedDataJSON = localStorage.getItem('dataEntries');
  const savedData = JSON.parse(savedDataJSON);
  if (savedData !== null) {
    data = savedData;
  }
  const savedFavoritesJSON = localStorage.getItem('favoritesEntries');
  const savedFavorites = JSON.parse(savedFavoritesJSON);
  if (savedFavorites !== null) {
    favorites = savedFavorites;
  }
}
