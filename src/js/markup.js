import { refs } from './refs';
export { createCards, addMarkup, eraseCards };
function createCards(pictures) {
  const markup = pictures
    .map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
      <a class="card-link" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info card-footer">
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
  </a>
  </div>`;
    })
    .join('');
  return markup;
}

function addMarkup(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function eraseCards() {
  refs.gallery.innerHTML = '';
}
