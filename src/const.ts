const PLACES_COUNT = 13;
const CARDS_PER_PAGE = 5;

const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

enum Page {
  Main = 'main',
  Offer = 'offer',
  Login = 'login',
  Favorites = 'favorites',
  Page404 = 'page404'
}

export {PLACES_COUNT, CARDS_PER_PAGE, CITIES, Page};
