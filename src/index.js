import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import Notiflix, { Notify } from 'notiflix';
import { refs } from './js/refs';
import { PixabayApi } from './js/request';
import { createCards, addMarkup, eraseCards } from './js/markup';
const ALERT_STRING = 'Sorry, there are no images matching your search query. Please try again.';
let lightbox;
const pixabayApi = new PixabayApi();

refs.gallery.addEventListener('click', onImageClick);
refs.button.addEventListener('click', onLoad);
refs.form.addEventListener('input', onInput);
refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  eraseCards();
  if (pixabayApi.searchQuery === '') {
    Notiflix.Notify.failure('Query string is empty! You should type something!!!');
    refs.button.classList.add('visually-hidden');
    return;
  }
  pixabayApi.resetPage();
  renderPage();
}

function onImageClick(e) {
  e.preventDefault();
  if (e.target.nodeName === 'a') {
    lightbox.open(e.target);
  }
}

async function onLoad(e) {
  pixabayApi.incrementPage();
  await renderPage();
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2.65,
    behavior: 'smooth',
  });

  // refs.gallery.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
}

function onInput(e) {
  pixabayApi.query = e.target.value.trim();
}

function initLightboxInstance() {
  lightbox = new SimpleLightbox('.photo-card a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 500,
  });
  lightbox.refresh();
}

async function renderPage() {
  try {
    const data = pixabayApi.fetchPictures();
    const pictures = await data;
    let responseQuantity = pictures.totalHits;
    let cardsOnPageQuantity = pictures.hits.length;
    const STRING_OF_JOY = `Hooray! We found ${responseQuantity} images.`;
    if (cardsOnPageQuantity === 0) {
      Notiflix.Notify.failure(ALERT_STRING);
      refs.button.classList.add('visually-hidden');
    }
    if (pixabayApi.page === 1 && cardsOnPageQuantity >= 1) {
      Notiflix.Notify.success(STRING_OF_JOY);
      refs.button.classList.remove('visually-hidden');
    }
    if (cardsOnPageQuantity > 0 && cardsOnPageQuantity < 40) {
      refs.button.classList.add('visually-hidden');
    }
    addMarkup(createCards(pictures.hits));
    initLightboxInstance();
  } catch ({ name, message, stack }) {
    console.log(`Error name: ${name}`);
    console.log(`Error message: ${message}`);
    console.log(`Stack state: ${stack}`);
  }
}
