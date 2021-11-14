import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { fetchPictures } from './js/request';
import Notiflix from 'notiflix';
const ALERT_STRING = 'Sorry, there are no images matching your search query. Please try again.';
let query;
let page = 1;

const form = document.querySelector('#search-form');
const searchInput = document.querySelector('[name="searchQuery"]');
const button = document.querySelector('.load-more');
button.addEventListener('click', onClick);

const gallery = document.querySelector('.gallery');
form.addEventListener('input', onInput);
form.addEventListener('submit', onSubmit);
function onClick(e) {
  page += 1;
  renderPictures();
}
function onInput(e) {
  query = e.target.value;
}
function onSubmit(e) {
  e.preventDefault();
  renderPictures();
  button.removeAttribute('disabled');
}

async function renderPictures() {
  const KEY = '24271792-2ae9c4be49492e469cc4e2f34';
  const BASE_URL = 'https://pixabay.com/api/';
  try {
    gallery.innerHTML = '';
    const pictures = await fetchPictures(
      `${BASE_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&page=${page}&per_page=40`,
    );
    let responseQuantity = pictures.hits.length;
    const cards = await createCards(pictures.hits);
    const markup = await addMarkup(cards);
    console.log(responseQuantity);
    if (responseQuantity < 40 && responseQuantity > 0) {
      button.setAttribute('disabled', true);
    } else if (responseQuantity === 0) {
      Notiflix.Notify.failure(ALERT_STRING);
    } else return markup;
  } catch ({ name, message, stack }) {
    console.log(name);
    console.log(message);
    console.log(stack);
  }
}

function createCards(pictures) {
  const markup = pictures
    .map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
      return ` <div class="photo-card">
      <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
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
