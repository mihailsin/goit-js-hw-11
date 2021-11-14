import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import Notiflix, { Notify } from 'notiflix';
import { form, searchInput, button, gallery } from './js/refs';
import { PixabayApi } from './js/request';
import { createCards } from './js/markup';
const ALERT_STRING = 'Sorry, there are no images matching your search query. Please try again.';
let query;
let lightbox;
let page;
gallery.addEventListener('click', onImageClick);
button.addEventListener('click', onClick);
form.addEventListener('input', onInput);
form.addEventListener('submit', onSubmit);
function onImageClick(e) {
  e.preventDefault();
  if (e.target.nodeName === 'a') {
    lightbox.open(e.target);
  }
}

function onClick(e) {
  page += 1;
  renderPictures();
  lightbox.refresh();
}
function onInput(e) {
  query = e.target.value.trim();
}
function onSubmit(e) {
  e.preventDefault();
  if (query === undefined || query === '') {
    Notiflix.Notify.failure('Query string is empty! You should type something!!!');
    return;
  }
  page = 1;
  renderPictures();
  button.removeAttribute('disabled');
}

// async function renderPictures() {
//   const KEY = '24271792-2ae9c4be49492e469cc4e2f34';
//   const REQUEST_PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true';
//   const BASE_URL = 'https://pixabay.com/api/';
//   try {
//     gallery.innerHTML = '';
//     const pictures = await fetchPictures(
//       `${BASE_URL}?key=${KEY}&q=${query}&${REQUEST_PARAMS}&page=${page}&per_page=40`,
//     );
//     const cards = await createCards(pictures.hits);
//     const markup = await addMarkup(cards);
//     lightbox = new SimpleLightbox('.photo-card a', {
//       captionsData: 'alt',
//       captionPosition: 'bottom',
//       captionDelay: 500,
//     });
//     lightbox.refresh();
//     let totalHits = pictures.totalHits;
//     let responseQuantity = pictures.hits.length;
//     const STRING_OF_JOY = `Hooray! We found ${totalHits} images.`;
//     if (page === 1 && responseQuantity > 1) {
//       Notiflix.Notify.success(STRING_OF_JOY);
//     }
//     if (responseQuantity < 40 && responseQuantity > 0) {
//       button.setAttribute('disabled', true);
//     } else if (responseQuantity === 0) {
//       Notiflix.Notify.failure(ALERT_STRING);
//       button.classList.add('visually-hidden');
//     } else {
//       button.classList.remove('visually-hidden');
//     }
//     return markup;
//   } catch ({ name, message, stack }) {
//     console.log(name);
//     console.log(message);
//     console.log(stack);
//   }
// }
// function addMarkup(markup) {
//   gallery.insertAdjacentHTML('beforeend', markup);
// }
