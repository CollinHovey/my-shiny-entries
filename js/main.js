var favorites = [
  {
    pokemon: 'pikachu',
    nickname: 'bolt',
    encounters: 564,
    picture: 'images/pikachu-f.png'
  },
  {
    pokemon: 'charizard',
    nickname: 'charmlizardo',
    encounters: 2323,
    picture: 'images/charizard.png'
  }
];

var $favoritesView = document.querySelector('.carousel');
// var $newCatchView = document.querySelector('.new-catch');
var $libraryView = document.querySelector('.library');
var $favoritesButton = document.querySelector('.favorites-button');
// var $newCatchButton = document.querySelector('.new-catch-button');
var $libraryButton = document.querySelector('.library-button');
var $carouselImage = document.querySelector('.favorite-image');
var $carouselPokemon = document.querySelector('.carousel-pokemon');
var $carouselNickName = document.querySelector('.carousel-name');
var $carouselEncounters = document.querySelector('.carousel-encounters');
var $carouselLeftButton = document.querySelector('div.left-button');
var $carouselRightButton = document.querySelector('div.right-button');
var $searchBar = document.querySelector('.search-bar');
var $allEntries = document.querySelectorAll('.entry');

function switchFavorites(event) {
  clearInterval(stopCarousel);
  stopCarousel = setInterval(carouselSwitch, 5000);
  $libraryView.setAttribute('class', 'library hidden');
  $favoritesView.setAttribute('class', 'carousel');
}

function switchLibrary(event) {
  clearInterval(stopCarousel);
  $libraryView.setAttribute('class', 'library');
  $favoritesView.setAttribute('class', 'carousel hidden');
}

$favoritesButton.addEventListener('click', switchFavorites);

$libraryButton.addEventListener('click', switchLibrary);

var stopCarousel = setInterval(carouselSwitch, 5000);

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
