import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { notification } from './js/notifications';
import { refs } from './js/refs';
import { PixabayApi } from './js/request';
import { createCards, addMarkup, eraseCards } from './js/markup';

let observer;
let lastCard;
let lightbox;

let responseQuantity;
let cardsOnPageQuantity;

const pixabayApi = new PixabayApi();

refs.gallery.addEventListener('click', onImageClick);
refs.form.addEventListener('input', onInput);
refs.form.addEventListener('submit', onSubmit);

function createObserver() {
  const options = {
    threshold: 0.9,
  };
  observer = new IntersectionObserver(callback, options);

  function callback(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        onLoad();
      }
    });
  }
  lastCard = document.querySelector('.gallery > a:last-child');
  if (cardsOnPageQuantity > 0) {
    observer.observe(refs.spinner);
  }
}

function setSpinnerVisibility() {
  if (cardsOnPageQuantity > 0 && cardsOnPageQuantity < 40) {
    refs.spinner.classList.add('visually-hidden');
  } else if (cardsOnPageQuantity === 0) {
    refs.spinner.classList.add('visually-hidden');
  } else refs.spinner.classList.remove('visually-hidden');
}

function onSubmit(e) {
  e.preventDefault();
  eraseCards();
  if (pixabayApi.searchQuery === '') {
    notification.queryIsEmpty();
    refs.spinner.classList.add('visually-hidden');
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
  observer.unobserve(refs.spinner);
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
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 500,
  });
  lightbox.refresh();
}

function notify() {
  if (cardsOnPageQuantity === 0) {
    return notification.searchFailure();
  }
  if (pixabayApi.page === 1 && cardsOnPageQuantity >= 1) {
    return notification.searchSuccess(`Hooray! We found ${responseQuantity} images.`);
  }
}

async function renderPage() {
  try {
    const data = pixabayApi.fetchPictures();
    const pictures = await data;
    responseQuantity = pictures.totalHits;
    cardsOnPageQuantity = pictures.hits.length;
    notify();
    addMarkup(createCards(pictures.hits));
    initLightboxInstance();
    setSpinnerVisibility();
    setTimeout(() => {
      createObserver();
    }, 3000);
  } catch (error) {
    console.log(error);
  }
}
