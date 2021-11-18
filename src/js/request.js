const axios = require('axios');
axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '24271792-2ae9c4be49492e469cc4e2f34';
const REQUEST_PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true';

class PixabayApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPictures() {
    const response = await axios.get(
      `?key=${KEY}&q=${this.searchQuery}&${REQUEST_PARAMS}&page=${this.page}&per_page=40`,
    );
    const pictures = await response.data;
    return pictures;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  get query() {
    return this.searchQuery;
  }
}

export { PixabayApi };
