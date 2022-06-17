/* global data, favorites */
var $favoritesView = document.querySelector('.carousel');
var $newCatchView = document.querySelector('.new-catch');
var $libraryView = document.querySelector('.library');
var $favoritesButton = document.querySelector('.favorites-button');
var $newCatchButton = document.querySelector('.new-catch-button');
var $libraryButton = document.querySelector('.library-button');
var $carouselImage = document.querySelector('.favorite-image');
var $carouselPokemon = document.querySelector('.carousel-pokemon');
var $carouselNickName = document.querySelector('.carousel-name');
var $carouselEncounters = document.querySelector('.carousel-encounters');
var $carouselLeftButton = document.querySelector('div.left-button');
var $carouselRightButton = document.querySelector('div.right-button');
var $searchBar = document.querySelector('.search-bar');
var $allEntries = document.querySelectorAll('.entry');
var $newCatchForm = document.querySelector('.new-catch-form');
var $cancelNewCatchButton = document.querySelector('button.new-catch-cancel');
var $saveNewCatchButton = document.querySelector('button.new-catch-save');
var $newCatchPokemon = document.querySelector('.new-catch-pokemon');
var $newCatchNickName = document.querySelector('.new-catch-nickname');
var $newCatchEncounters = document.querySelector('.new-catch-encounters');
var $editCatchView = document.querySelector('.edit-catch');
var $cancelEditCatchButton = document.querySelector('button.edit-catch-cancel');
var $saveEditCatchButton = document.querySelector('button.edit-catch-save');
var $editCatchPokemon = document.querySelector('.edit-catch-pokemon');
var $editCatchNickName = document.querySelector('.edit-catch-nickname');
var $editCatchEncounters = document.querySelector('.edit-catch-encounters');

function switchFavorites(event) {
  clearInterval(stopCarousel);
  stopCarousel = setInterval(carouselSwitch, 5000);
  $libraryView.setAttribute('class', 'library hidden');
  $favoritesView.setAttribute('class', 'carousel');
  $newCatchView.setAttribute('class', 'new-catch hidden');
  $editCatchView.setAttribute('class', 'edit-catch hidden');
}

function switchLibrary(event) {
  clearInterval(stopCarousel);
  $libraryView.setAttribute('class', 'library');
  $favoritesView.setAttribute('class', 'carousel hidden');
  $newCatchView.setAttribute('class', 'new-catch hidden');
  $editCatchView.setAttribute('class', 'edit-catch hidden');
}

function switchNewCatch(event) {
  clearInterval(stopCarousel);
  $libraryView.setAttribute('class', 'library hidden');
  $favoritesView.setAttribute('class', 'carousel hidden');
  $newCatchView.setAttribute('class', 'new-catch');
  $editCatchView.setAttribute('class', 'edit-catch hidden');
}

function switchEditCatch(event) {
  $libraryView.setAttribute('class', 'library hidden');
  $editCatchView.setAttribute('class', 'edit-catch');
}

$newCatchButton.addEventListener('click', switchNewCatch);

$favoritesButton.addEventListener('click', switchFavorites);

$libraryButton.addEventListener('click', switchLibrary);

if (favorites.length !== 0) {
  var stopCarousel = setInterval(carouselSwitch, 5000);
}

var carouselCounter = 0;

function carouselSwitch() {
  carouselCounter += 1;
  if (carouselCounter > (favorites.length - 1)) {
    carouselCounter = 0;
  }
  $carouselImage.setAttribute('src', favorites[carouselCounter].picture);
  $carouselPokemon.textContent = favorites[carouselCounter].pokemon;
  $carouselNickName.textContent = favorites[carouselCounter].nickname;
  $carouselEncounters.textContent = favorites[carouselCounter].encounters;
}

function carouselLeft() {
  clearInterval(stopCarousel);
  carouselCounter -= 1;
  if (carouselCounter < 0) {
    carouselCounter = (favorites.length - 1);
  }
  $carouselImage.setAttribute('src', favorites[carouselCounter].picture);
  $carouselPokemon.textContent = favorites[carouselCounter].pokemon;
  $carouselNickName.textContent = favorites[carouselCounter].nickname;
  $carouselEncounters.textContent = favorites[carouselCounter].encounters;
  stopCarousel = setInterval(carouselSwitch, 5000);
}

function carouselRight() {
  clearInterval(stopCarousel);
  carouselCounter += 1;
  if (carouselCounter > (favorites.length - 1)) {
    carouselCounter = 0;
  }
  $carouselImage.setAttribute('src', favorites[carouselCounter].picture);
  $carouselPokemon.textContent = favorites[carouselCounter].pokemon;
  $carouselNickName.textContent = favorites[carouselCounter].nickname;
  $carouselEncounters.textContent = favorites[carouselCounter].encounters;
  stopCarousel = setInterval(carouselSwitch, 5000);
}

$carouselLeftButton.addEventListener('click', carouselLeft);
$carouselRightButton.addEventListener('click', carouselRight);

function search(event) {
  var searchCompare = event.target.value.toLowerCase();
  if (searchCompare === '') {
    for (var x = 0; x < data.library.length; x++) {
      $allEntries[x].setAttribute('class', 'entry entry-' + x);
    }
  }
  for (var y = 0; y < data.library.length; y++) {
    var pokemonCompare = data.library[y].pokemon.slice(0, event.target.value.length).toLowerCase();
    var nicknameCompare = data.library[y].nickname.slice(0, event.target.value.length).toLowerCase();
    if (searchCompare === pokemonCompare || nicknameCompare === searchCompare) {
      $allEntries[y].setAttribute('class', 'entry entry-' + y);
    } else {
      $allEntries[y].setAttribute('class', 'hidden entry entry-' + y);
    }
  }
}

$searchBar.addEventListener('input', search);

function cancelNewCatch() {
  $libraryView.setAttribute('class', 'library');
  $newCatchView.setAttribute('class', 'new-catch hidden');
  $newCatchForm.reset();
}

function newLibraryEntry(entry) {
  var $containerDiv = document.createElement('div');
  $containerDiv.setAttribute('class', 'entry entry-' + entry.entryId);
  var $displayDiv = document.createElement('div');
  $displayDiv.setAttribute('class', 'entry-display');
  $containerDiv.appendChild($displayDiv);
  var $image = document.createElement('img');
  $image.setAttribute('class', 'entry-image');
  $image.setAttribute('src', entry.picture);
  $image.setAttribute('alt', entry.pokemon);
  $displayDiv.appendChild($image);
  var $entryNameDiv = document.createElement('div');
  $entryNameDiv.setAttribute('class', 'entry-name');
  $displayDiv.appendChild($entryNameDiv);
  var $entryPokemon = document.createElement('h1');
  $entryPokemon.setAttribute('class', 'entry-header');
  $entryPokemon.textContent = entry.pokemon;
  $entryNameDiv.appendChild($entryPokemon);
  var $entryNickName = document.createElement('h1');
  $entryNickName.setAttribute('class', 'entry-secondary');
  $entryNickName.textContent = entry.nickname;
  $entryNameDiv.appendChild($entryNickName);
  var $entryEncounterDiv = document.createElement('div');
  $entryEncounterDiv.setAttribute('class', 'entry-encounter');
  $displayDiv.appendChild($entryEncounterDiv);
  var $entryEncounter = document.createElement('h1');
  $entryEncounter.setAttribute('class', 'entry-header');
  $entryEncounter.textContent = 'Encounters';
  $entryEncounterDiv.appendChild($entryEncounter);
  var $entryEncounters = document.createElement('h1');
  $entryEncounters.setAttribute('class', 'entry-secondary');
  $entryEncounters.textContent = entry.encounters;
  $entryEncounterDiv.appendChild($entryEncounters);
  var $entryEditDiv = document.createElement('div');
  $entryEditDiv.setAttribute('class', 'entry-edit-div');
  $containerDiv.appendChild($entryEditDiv);
  var $editEntryButton = document.createElement('i');
  $editEntryButton.setAttribute('class', 'fa-solid fa-pencil fa-3x edit-entry-button edit-entry-button-' + entry.entryId);
  $entryEditDiv.appendChild($editEntryButton);
  $editEntryButton.addEventListener('click', openEditEntry);
  return $containerDiv;
}

function saveNewCatch(event) {
  event.preventDefault();
  var newShiny = {};
  newShiny.pokemon = $newCatchPokemon.value;
  newShiny.nickname = $newCatchNickName.value;
  newShiny.encounters = parseInt($newCatchEncounters.value);
  newShiny.entryId = data.nextEntryId;
  data.nextEntryId += 1;
  function requestTest(name) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + name);
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      newShiny.picture = xhr.response.sprites.front_shiny;
      data.library.push(newShiny);
      $libraryView.appendChild(newLibraryEntry(newShiny));
      $libraryView.setAttribute('class', 'library');
      $newCatchView.setAttribute('class', 'new-catch hidden');
      $newCatchForm.reset();
    });
    xhr.send();
  }
  requestTest($newCatchPokemon.value.toLowerCase());
}

$cancelNewCatchButton.addEventListener('click', cancelNewCatch);
$saveNewCatchButton.addEventListener('click', saveNewCatch);

function loadLibrary() {
  for (var x = 0; x < data.library.length; x++) {
    if (data.library.length !== 0) {
      $libraryView.appendChild(newLibraryEntry(data.library[x]));
    }
  }
}

window.addEventListener('DOMContentLoaded', loadLibrary);

var editEntryNumber = 0;

function openEditEntry(event) {
  for (var x = 0; x < data.library.length; x++) {
    if (event.target.getAttribute('class') === ('fa-solid fa-pencil fa-3x edit-entry-button edit-entry-button-') + x) {
      editEntryNumber = x;
      $editCatchPokemon.value = data.library[x].pokemon;
      $editCatchNickName.value = data.library[x].nickname;
      $editCatchEncounters.value = data.library[x].encounters;
      switchEditCatch();
    }
  }
}

function cancelEditCatch(event) {
  event.preventDefault();
  $libraryView.setAttribute('class', 'library');
  $editCatchView.setAttribute('class', 'edit-catch hidden');
}

$cancelEditCatchButton.addEventListener('click', cancelEditCatch);

function saveEditCatch(event) {
  event.preventDefault();
  data.library[editEntryNumber].pokemon = $editCatchPokemon.value;
  data.library[editEntryNumber].nickname = $editCatchNickName.value;
  data.library[editEntryNumber].encounters = $editCatchEncounters.value;
  var $entryDiv = document.querySelector('.entry-' + editEntryNumber);
  function request(name) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + name);
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      data.library[editEntryNumber].picture = xhr.response.sprites.front_shiny;
      $entryDiv.children[0].children[0].setAttribute('src', xhr.response.sprites.front_shiny);
    });
    xhr.send();
  }
  if ($entryDiv.children[0].children[1].children[0].textContent !== $editCatchPokemon.value) {
    request($editCatchPokemon.value.toLowerCase());
  }
  $entryDiv.children[0].children[1].children[0].textContent = $editCatchPokemon.value;
  $entryDiv.children[0].children[1].children[1].textContent = $editCatchNickName.value;
  $entryDiv.children[0].children[2].children[1].textContent = $editCatchEncounters.value;
  $libraryView.setAttribute('class', 'library');
  $editCatchView.setAttribute('class', 'edit-catch hidden');
}

$saveEditCatchButton.addEventListener('click', saveEditCatch);
