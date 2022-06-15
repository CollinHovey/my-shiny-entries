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

function switchFavorites(event) {
  clearInterval(stopCarousel);
  stopCarousel = setInterval(carouselSwitch, 5000);
  $libraryView.setAttribute('class', 'library hidden');
  $favoritesView.setAttribute('class', 'carousel');
  $newCatchView.setAttribute('class', 'new-catch hidden');
}

function switchLibrary(event) {
  clearInterval(stopCarousel);
  $libraryView.setAttribute('class', 'library');
  $favoritesView.setAttribute('class', 'carousel hidden');
  $newCatchView.setAttribute('class', 'new-catch hidden');
}

function switchNewCatch(event) {
  clearInterval(stopCarousel);
  $libraryView.setAttribute('class', 'library hidden');
  $favoritesView.setAttribute('class', 'carousel hidden');
  $newCatchView.setAttribute('class', 'new-catch');
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
  var $image = document.createElement('img');
  $image.setAttribute('class', 'entry-image');
  $image.setAttribute('src', entry.picture);
  $image.setAttribute('alt', entry.pokemon);
  $containerDiv.appendChild($image);
  var $entryNameDiv = document.createElement('div');
  $entryNameDiv.setAttribute('class', 'entry-name');
  $containerDiv.appendChild($entryNameDiv);
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
  $containerDiv.appendChild($entryEncounterDiv);
  var $entryEncounter = document.createElement('h1');
  $entryEncounter.setAttribute('class', 'entry-header');
  $entryEncounter.textContent = 'Encounters';
  $entryEncounterDiv.appendChild($entryEncounter);
  var $entryEncounters = document.createElement('h1');
  $entryEncounters.setAttribute('class', 'entry-secondary');
  $entryEncounters.textContent = entry.encounters;
  $entryEncounterDiv.appendChild($entryEncounters);
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
