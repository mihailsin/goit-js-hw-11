const axios = require('axios');
const KEY = '24271792-2ae9c4be49492e469cc4e2f34';
const REQUEST_PARAMS =
  'image_type=photo&orientation=horizontal&safesearch=true';
const BASE_URL = 'https://pixabay.com/api/';

class PixabayApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPictures(url) {
    const response = await axios.get(url);
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

export { KEY, REQUEST_PARAMS, BASE_URL, PixabayApi };
