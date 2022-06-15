/* exported data */
/* exported favorites */
var data = {
  nextEntryId: 0,
  library: []
};

var favorites = [];

window.addEventListener('beforeunload', saveData);
pullData();

function saveData(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('dataEntries', dataJSON);
  var favoritesJSON = JSON.stringify(favorites);
  localStorage.setItem('favoritesEntries', favoritesJSON);
}

function pullData(event) {
  var savedDataJSON = localStorage.getItem('dataEntries');
  var savedData = JSON.parse(savedDataJSON);
  if (savedData !== null) {
    data = savedData;
  }
  var savedFavoritesJSON = localStorage.getItem('favoritesEntries');
  var savedFavorites = JSON.parse(savedFavoritesJSON);
  if (savedFavorites !== null) {
    favorites = savedFavorites;
  }
}
