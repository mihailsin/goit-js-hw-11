import { fetchPictures } from './js/request';
const KEY = '24271792-2ae9c4be49492e469cc4e2f34';
const BASE_URL = 'https://pixabay.com/api/';
const PAGINATE = 'page=1&per_page=40';
let query;
let page;
const form = document.querySelector('#search-form');
const searchInput = document.querySelector('[name="searchQuery"]');
form.addEventListener('input', onInput);
form.addEventListener('submit', onSubmit);
function onInput(e) {
  query = e.target.value;
}
function onSubmit(e) {
  e.preventDefault();
  renderPictures();
}
const gallery = document.querySelector('.gallery');

async function renderPictures() {
  try {
    const pictures = await fetchPictures(`${BASE_URL}?key=${KEY}&q=${query}&${PAGINATE}`);
    const cards = await createCards(pictures.hits);
    const markup = await addMarkup(cards);
    return markup;
  } catch ({ name, message, stack }) {
    console.log(name);
    console.log(message);
    console.log(stack);
  }
}

function createCards(pictures) {
  const markup = pictures
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
    Likes
      <b>${likes}</b>
    </p>
    <p class="info-item">
    Views
      <b>${views}</b>
    </p>
    <p class="info-item">
    Comments
      <b>${comments}</b>
    </p>
    <p class="info-item">
    Downloads
      <b>${downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');
  return markup;
}
function addMarkup(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
}
